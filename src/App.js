import './App.css';
import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";

function App() {

  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/argonautes")
      .then((res) => res.json())
      .then((res) => {
        setMembers(res.data);
      });
  }, [members]);

  const onSubmit = (data) => {
    fetch("http://localhost:8000/argonautes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    })
  }

  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <>
      <header>
        <h1>
          <img src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png" alt="Wild Code School logo" />
          Les Argonautes
        </h1>
      </header>

      <main>
        
        <h2>Ajouter un(e) Argonaute</h2>
        <form className="new-member-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Nom de l&apos;Argonaute</label>
          <input 
            id="name" 
            name="name" 
            type="text" 
            placeholder="Charalampos" 
            {...register("name", { required: true, maxLength: 50, minLength: 1,})}
          />
          {errors.name && (
                <span className="w-full text-red-600 italic text-xs absolute top-14">
                  Merci d'indiquer un nom de membre d'équipage entre 1 et 50 caractères
                </span>
              )}
          <button type="submit">Envoyer</button>
        </form>
        
        <h2>Membres de l'équipage</h2>
        <section className="member-list">
          {members && members.map((member) => {
            return (
              <div key={member.name} className="member-item">{member.name}</div>
            )
          })}
        </section>
      </main>

      <footer>
        <p>Réalisé par Jason en Anthestérion de l'an 515 avant JC</p>
      </footer>
      </>
  );
}

export default App;
