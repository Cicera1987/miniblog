

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
  } from "firebase/auth";
  
  import { useState, useEffect } from "react";

  export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // lidar com vazamento de memória
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
        return;
        }
    }

    // register - cadastro
    const createUser = async (data) => {
        checkIfIsCancelled();
    
        setLoading(true);
  
    
        try {
          const { user } = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
          );
    
          await updateProfile(user, {
            displayName: data.displayName,

          });

          setLoading(false);
          
          return user;  
        } catch (error) {
          console.log(error.message);
          console.log(typeof error.message);

    
          let systemErrorMessage;

          if (error.message.includes("passaword")) {
            systemErrorMessage = "A Senha deve conter 6 no mínimo caracteres .";
          } else if (error.message.includes("email-already")) {
            systemErrorMessage = "Email já cadastrado.";
          } else {
            systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
          }
    
          setError(systemErrorMessage);
        }
    
        setLoading(false);
      };
    
      // logout - pagina sair
      const logout = () => {
        checkIfIsCancelled();

        signOut(auth);
      }

      // login pagina entar
      const login = async(data) => {
       checkIfIsCancelled();
       
      setLoading(true);
      setError(false);

      try {

      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);

      }catch (error) {
        let systemErrorMessage;
        console.log(error.message);
        console.log(typeof error.message);
        console.log(error.message.includes("user-not"));

      if (error.message.includes("user-not-found")) {
          systemErrorMessage = "Usuário não encontardo."

      } else if (error.message.includes("wrong.password")){
        systemErrorMessage = "Senha incorreta."

      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
    }
      setError(systemErrorMessage);
      
  }
  setLoading(false);
}

      useEffect(() => {
        return () => setCancelled(true);
      }, []);

      return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,    
    };

  };