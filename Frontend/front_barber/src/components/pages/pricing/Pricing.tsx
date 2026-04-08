import { PricingItem } from "./PricingItem";

function Pricing() {
  return (
    <main>
      <section>
        <PricingItem pricingData={[
          {
            id: "1",
            name: "Стрижка",
            img : "https://kensingtonbarbers.com/wp-content/uploads/2022/08/IMG_20220806_0004201.jpg",
            price: 1500,
            description: "Классическая мужская стрижка с использованием профессиональных инструментов и техник.",
            buttonText: "Записаться"
          },
          {
            id: "2",
            name: "Оформление бороды",
            img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTud7JJRBUjBmmyCALKdIhkOkI1uexKoUzA8w&s",
            price: 800,
            description: "Традиционное бритье опасной бритвой с использованием горячих полотенец и ароматических масел.",
            buttonText: "Записаться"
        },
        {
            id: "3",
            name: "Стрижка + борода",
            img : "https://barbershopche.ru/images/aticle/boroda2.jpg",
            price: 1200,
            description: "Профессиональная укладка и уход за бородой, включая стрижку, моделирование и использование специальных средств.",
            buttonText: "Записаться"
          },
          {
            id: "4",
            name: "Стрижка детская",
            img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbzhthuv3c_8_mvc3384GoDqiokBJr3Wq64Q&s",
            price: 1000,
            description: "Безопасная и комфортная стрижка для детей с использованием профессиональных инструментов и техник.",
            buttonText: "Записаться"
          }
        ]} />
      </section>
    </main>
  );
}

export default Pricing;