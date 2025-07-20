import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  fetchPosts,
  deletePost,
  updatePost,
} from "../features/posts/postActions.js";
import { allPosts, loadingPosts } from "../features/posts/postSelectors.js";
import {
  Table,
  Button,
  Form,
  Pagination,
  Spinner,
} from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalAcciones from "../components/ModalAcciones";

import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

function PostsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector(allPosts);
  const loading = useSelector(loadingPosts);

  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [manageData, setManageData] = useState({ name: "", description: "" });

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/");
    return;
  }

  dispatch(fetchPosts())
    .unwrap()
    .catch((err) => {
      console.log("el status", err.message);
      if (err.message === "401") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      }
    });
}, [dispatch, navigate]);

  useEffect(() => {
    if(posts && posts.length > 0){
        setFilteredPosts(
          posts.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          )
        );
    }
  }, [search, posts]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleShowModal = (type, post) => {
    setModalType(type);
    setSelectedPost(post);
    if (type === "edit") {
      setManageData({ name: post.name, description: post.description });
    }
    setShowModal(true);
  };

const actions = {
  edit: async () => {
    await dispatch(updatePost({ id: selectedPost.id, data: manageData })).unwrap();
    toast.success(`Registro "${manageData.name}" editado correctamente`);
  },
  create: async () => {
    await dispatch(createPost(manageData)).unwrap();
    toast.success(`Nuevo registro "${manageData.name}" creado correctamente`);
  },
  delete: async () => {
    await dispatch(deletePost(selectedPost.id)).unwrap();
    toast.success(`Registro "${selectedPost.name}" eliminado correctamente`);
  }
};

const handleConfirmAction = async () => {
  try {
    if (
      modalType !== "delete" &&
      (!manageData.name.trim() || !manageData.description.trim())
    ) {
      toast.warning("No puedes ingresar información vacía", { position: "top-center", autoClose: 1000 });
      return;
    }

    await actions[modalType]?.();
    setShowModal(false);
    
  } catch (err) {
    if (err.message === "401") {
      localStorage.clear();
      navigate("/");
    } else {
      toast.error("Error al realizar la acción, intenta más tarde");
      console.error(err);
    }
  }
};


    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

const sortedPosts = [...filteredPosts].sort((a, b) => {
  if (!sortField) return 0;
  if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
  if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
  return 0;
});

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container mt-4">
        <ModalAcciones
            show={showModal}
            handleClose={() => setShowModal(false)}
            modalType={modalType}
            selectedPost={selectedPost}
            manageData={manageData}
            loadingModal={loading}
            setManageData={setManageData}
            handleConfirmAction={handleConfirmAction}
        />
        <ToastContainer position="top-right" autoClose={3000} />
        <h2 className="mb-3 text-center">Gestión de Posts</h2>
        <Form className="d-flex justify-content-between mb-3" onSubmit={handleSearch}>
            <Form.Control
            type="text"
            placeholder="Buscar por nombre"
            value={search}
            className="w-25"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
            />
            <div>
                <Button type="submit" className="btn-cancel ms-2">
                    Buscar
                </Button>
                <Button
                className="btn-custom ms-3"
                onClick={() => {
                    setModalType("create");
                    setManageData({ name: "", description: "" });
                    setSelectedPost(null);
                    setShowModal(true);
                }}
                >
                    + Agregar Post
                </Button>
            </div>
        </Form>

        {loading ? (
            <div className="text-center">
            <Spinner animation="border" />
            </div>
        ) : (
            <Table striped bordered hover>
            <thead>
                <tr>
                <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                Nombre {sortField === "name" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("description")} style={{ cursor: "pointer" }}>
                Descripción {sortField === "description" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {currentPosts.map((post) => (
                <tr key={post.id}>
                    <td>{post.name}</td>
                    <td>{post.description}</td>
                    <td>
                    <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowModal("edit", post)}
                    >
                        <FaEdit />
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleShowModal("delete", post)}
                    >
                        <FaTrash />
                    </Button>
                    </td>
                </tr>
                ))}
            </tbody>
            </Table>
        )}

            <div className="d-flex justify-content-between align-items-center mt-3">
                <Pagination className="btn-custom">
                    {Array.from(
                    { length: Math.ceil(filteredPosts.length / postsPerPage) },
                    (_, i) => (
                        <Pagination.Item
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => paginate(i + 1)}
                        >
                        {i + 1}
                        </Pagination.Item>
                    )
                    )}
                </Pagination>
                <div className="d-flex align-items-center">
                    <label className="me-2 mb-0">Registros por página:</label>
                    <Form.Select
                    size="sm"
                    value={postsPerPage}
                    onChange={(e) => {
                        setPostsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                    style={{ width: "80px" }}
                    >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    </Form.Select>
                </div>
            </div>
      </div>
      <Footer />
    </div>
    </>
  );
}

export default PostsPage;
