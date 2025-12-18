import React , {useState , useEffect} from "react";
import Layout from "../components/layout/Layout";
import axios from "axios"

const Faq = () => {
  const [metaData , setMetaData] = useState({})
  const faqs = [
    {
      question: "Do you offer quantity discounts?",
      answer: "Yes, we do.",
    },
    {
      question: "How do you ship the jackets?",
      answer:
        "We ship our jackets neatly arranged in boxes using DHL and FedEx.",
    },
    {
      question: "How do I pay for bulk orders?",
      answer:
        "You can make a bank wire transfer into our corporate account for your bulk/wholesale purchase.",
    },
    {
      question: "Is there a minimum quantity of jackets that can be ordered?",
      answer:
        "We have no minimum quantity; you can order as few as a single jacket.",
    },
    {
      question: "Can I subsequently cancel my order?",
      answer:
        "Yes, you can always cancel your order within 24 hours of placing it. However, a $25 fee applies each time you cancel an order.",
    },
    {
      question: "Can I order a single jacket for myself with my design?",
      answer:
        "Yes, you can. You can upload your design through our Online Jacket Builder.",
    },
    {
      question: "Can I design my jacket with the Jacket Builder?",
      answer:
        "Yes, you can. The Jacket Builder is designed to show how much we embrace creativity and uniqueness. If you are unable to design your jacket, our design team will assist you in completing the process.",
    },
    {
      question: "Can I get custom logos?",
      answer:
        "Yes, you can have your logos on the jackets. Simply upload them through our Online Jacket Builder.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards and PayPal payments. For bulk/wholesale purchases, you can also make a bank wire transfer into our corporate account.",
    },
    {
      question: "Which countries do you deliver to?",
      answer: "We deliver worldwide except to Russia, Israel, and Africa.",
    },
    {
      question: "How much are the delivery costs?",
      answer:
        "Delivery costs vary by country. To see the charges, input your delivery address on the cart page.",
    },
    {
      question: "Can I change or cancel my order?",
      answer:
        "Yes, you can change or cancel your order within 24 hours, because we start to process every order after 24 hours of placement. For changes, send us an email with the subject line including the 5 DIGIT ORDER NUMBER + CHANGES (e.g., 12345 CHANGES).",
    },
    {
      question: "Do you produce Senior className Jackets only?",
      answer:
        "No, we make all kinds of custom jackets for junior classNamees, senior classNamees, clubs, sports clubs, fraternities, universities, colleges, businesses, dance studios, corporate teams, and even travel groups. Select the piece you like and contact us for assistance.",
    },
    {
      question: "How can I get help with my design?",
      answer:
        "Our Online Jacket Builder is a simple, pick-and-drop design lab to help you design your custom jackets. If you are unable to design your jacket, our design team will assist you in completing the process.",
    },
    {
      question: "How long do custom jackets take to deliver?",
      answer:
        "We ship all custom-made jackets (with or without lettering) in 15 working days, and it takes 3-5 working days to reach you. The estimated delivery date may change if we are out of stock or are sourcing the best material for you.",
    },
  ];

  
  const getMetaTags = async() =>{
    const { data } = await axios.get(`/api/v1/metadata/homepage`)

    setMetaData(data?.metadata)
}
  
useEffect(() =>{
  getMetaTags()
},[])

  return (
    <Layout title={metaData?.title} description={metaData?.description} keywords={metaData?.keywords}>
      <div classNameName="faq-container container">
        <h2 classNameName="faq-title mb-5" style={{ marginTop : "50px"}}>Frequently Asked Questions</h2>
        <div classNameName="faq-list mt-5">
          {faqs.map((faq, index) => (
            <div className="accordion d-flex justify-content-center  " id="accordionExample">
              <div className="accordion-item w-80 d-flex flex-column justify-content-center " style={{width:'80%',}}>
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                   {faq.question}
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                   {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Faq;
