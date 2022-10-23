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

  const deleteMember = (member_id) => {
    fetch(`http://localhost:8000/argonautes/${member_id}`, {
      method: "DELETE"
    }).then(
      
    )
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
        
        <h2 className='pt-2 text-wildcodeschool'>Ajouter un(e) Argonaute</h2>
        <form className="new-member-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Nom de l&apos;Argonaute</label>
          <input 
            className='p-2 border-2 border-wildcodeschool mt-2'
            id="name" 
            name="name" 
            type="text" 
            placeholder="Charalampos" 
            {...register("name", { required: true, maxLength: 50, minLength: 1,})}
          />
          <button type="submit" className='border-2 rounded p-2 ml-2 bg-wildcodeschool hover:bg-white border-wildcodeschool'>Envoyer</button>
          {errors.name && (
                <span className="">
                  Merci d'indiquer un nom de membre d'équipage entre 1 et 50 caractères
                </span>
              )}
        </form>
        
        <h2 className='mb-6 text-wildcodeschool text-2xl'>Membres de l'équipage</h2>
        <section className="member-list grid grid-cols-3 gap-4">
          {members && members.map((member) => {
            return (
              <div className='flex flex-row my-2'>
                <button className="border-2 border-red-600 rounded mr-2 px-2 bg-red-600 text-white hover:bg-white hover:text-black" onClick={() => deleteMember(member.member_id)}>
                    X
                </button>
                <div key={member.name} className="member-item uppercase">{member.name}</div>
              </div>  
            )
          })}
        </section>
      </main>

      <footer className='w-full absolute bottom-0'>
        <p>Réalisé par Adrien en Anthestérion de l'an 515 avant JC</p>
      </footer>
      </>
  );
}

export default App;
