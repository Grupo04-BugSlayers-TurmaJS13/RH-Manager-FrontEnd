import { FaReact } from "react-icons/fa6"
import logorh from "../../assets/logo-rh.png"
import Beneficios from "../../component/beneficio/beneficio/Beneficio"
import Funcionalidades from "../../component/funcionalidade/funcionalidade/Funcionalidade"
import { BsTypescript } from "react-icons/bs"
import { SiNestjs } from "react-icons/si"

function Sobre() {
  return (
    <>
        <section>
          <article>
              <figure>
                  <img src={logorh} alt="logo-rh" />
              </figure>

              <div>
                <h1>Sobre nós:</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                  Minus quibusdam iste enim commodi temporibus culpa deserunt est molestias, 
                  ipsa a adipisci alias pariatur sunt voluptates asperiores cum, 
                  aspernatur natus aliquid.

                </p>
              </div>
              <div>
                <h1>Tecnologias</h1>
                <p><FaReact size={30}/>React</p>
                <p><BsTypescript size={30}/>Typescript</p>
                <p><SiNestjs size={30}/>Nest</p>
              </div>
              

              <Funcionalidades/>
              <Beneficios/>
            </article>
        </section>
    </>
  )
}

export default Sobre