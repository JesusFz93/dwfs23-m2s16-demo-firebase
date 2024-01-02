import { useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";

const formInit = {
  nombre: "",
  categoria: "",
  imagen: "",
};

const MoviePage = () => {
  const [form, setForm] = useState(formInit);
  const [pelicula, setPelicula] = useState({});

  const { id } = useParams();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const editarPelicula = async (e) => {
    e.preventDefault();

    const pelicula = doc(db, "peliculas", id);
    await updateDoc(pelicula, form);
    await obtenerPelicula();
  };

  const obtenerPelicula = async () => {
    const pelicula = doc(db, "peliculas", id);
    const resp = await getDoc(pelicula);

    setPelicula(resp.data());
    setForm({
      nombre: resp.data().nombre,
      categoria: resp.data().categoria,
      imagen: resp.data().imagen,
    });
  };

  return (
    <>
      <header className="row col">
        <h1>Pelicula</h1>
      </header>
      <section className="row">
        <article className="col">
          <form onSubmit={editarPelicula}>
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
                <button type="submit" className="btn btn-warning">
                  Editar pelicula
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
            onClick={obtenerPelicula}
          >
            Obtener pelicula
          </button>
        </article>
        <article className="col">
          <div className="card mb-3" style={{ maxWidth: 540 }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={pelicula.imagen}
                  className="img-fluid rounded-start"
                  alt={pelicula.nombre}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{pelicula.nombre}</h5>
                  <p className="card-text">{pelicula.categoria}</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
};

export default MoviePage;
