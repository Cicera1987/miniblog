import styles from './CreatePost.module.css';

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreatePost = () => {

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const {user} = useAuthValue();

  const navigate = useNavigate();

  const {insertDocument, response} = useInsertDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")

    // validar url da imagem
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    // criar o array das tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());


    // checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    console.log(tagsArray);

    console.log({
      title,
      image,
      body,
      tags:tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    if(formError) return

    insertDocument({
      title,
      image,
      body,
      tags:tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });


    // redirecionamento para a pagina inicial - home page
    navigate("/");
  };



  return (
    <div className={styles.create_post}>
        <h2>Criar Postagem </h2>
        <p>Comece a compartilhar suas ideias</p>
        <form onSubmit={handleSubmit}>
          <label>
              <span>Título</span>
              <input 
              type="text" 
              name="title"
              riquered
              placeholder="Seja criativo..."
              onChange={(e) => setTitle(e.target.value)}
              value ={title}
              />
          </label>

          <label>
              <span>URL da imagem</span>
              <input 
              type="text" 
              name="image"
              riquered
              placeholder="Insira uma imagem que condiz com sua idéia..."
              onChange={(e) => setImage(e.target.value)}
              value ={image}
              />
          </label>

          <label>
              <span>Conteúdo</span>
              <textarea 
              name="body" 
              riquered 
              placeholder="Expresse aqui suas idéias..."
              onChange={(e) => setBody(e.target.value)}
              value ={body}>
              </textarea>
          </label>

          <label>
              <span>Tags</span>
              <input 
              type="text" 
              name="tags"
              riquered
              placeholder="Insira as tags, separadas por vígulas"
              onChange={(e) => setTags(e.target.value)}
              value ={tags}
              />
          </label>
          {! response.loading && <button className="btn">Criar Post</button>}
          {response.loading && (
            <button className="btn" disabled
            >Aguarde...
            </button>
            )}
          {(response.error|| formError) && (
          <p className="error">{response.error || formError}</p>
          )}
        </form>
    </div>
  );
};

export default CreatePost;