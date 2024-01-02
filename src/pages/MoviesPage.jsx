import { useState } from "react";
import { NavLink } from "react-router-dom";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const formInit = {
  nombre: "",
  categoria: "",
  imagen: "",
};

const MoviesPage = () => {
  const [form, setForm] = useState(formInit);
  const [peliculas, setPeliculas] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const agregarPelicula = async (e) => {
    e.preventDefault();

    const coleccion = collection(db, "peliculas");
    await addDoc(coleccion, form);
    await obtenerPeliculas();
  };

  const eliminarPelicula = async (id) => {
    const pelicula = doc(db, "peliculas", id);
    await deleteDoc(pelicula);
    await obtenerPeliculas();
  };

  const obtenerPeliculas = async () => {
    const resp = await getDocs(collection(db, "peliculas"));
    const peliculas = resp.docs.map((pelicula) => {
      return {
        id: pelicula.id,
        ...pelicula.data(),
      };
    });

    setPeliculas(peliculas);
  };

  return (
    <>
      <header className="row col">
        <h1>Peliculas</h1>
      </header>
      <section className="row">
        <article className="col">
          <form onSubmit={agregarPelicula}>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="inputNombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="inputCategoria" className="form-label">
                    Categoria
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCategoria"
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="inputImagen" className="form-label">
                    Imagen
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputImagen"
                    name="imagen"
                    value={form.imagen}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-success">
                  Agregar pelicula
                </button>
              </div>
            </div>
          </form>
        </article>
      </section>
      <main className="row">
        <article className="col">
          <button
            type="submit"
            className="btn btn-info"
            onClick={obtenerPeliculas}
          >
            Obtener peliculas
          </button>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {peliculas.map((pelicula) => {
              return (
                <div key={pelicula.id} className="col">
                  <div className="card h-100">
                    <img
                      src={pelicula.imagen}
                      className="card-img-top"
                      alt={pelicula.nombre}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{pelicula.nombre}</h5>
                      <p className="card-text">{pelicula.categoria}</p>
                      <div
                        className="btn-group d-flex justify-content-between"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => eliminarPelicula(pelicula.id)}
                        >
                          Eliminar
                        </button>
                        <NavLink
                          type="button"
                          className="btn btn-info"
                          to={`/movies/${pelicula.id}`}
                        >
                          Ver
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </main>
    </>
  );
};

export default MoviesPage;
