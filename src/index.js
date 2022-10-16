/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
const baseurl="https://platzi-avo.vercel.app"
const appNode=document.querySelector('#app')
const body=document.querySelector('#body')

//INTL: API  (dar formato a fechas y moneda)
const formatPrice = (price)=> { //function que recibe precio
  const newPrice = new window.Intl.NumberFormat("en-EN", {
      style: "currency",
      currency: "USD",
  }).format(price);//incializado API(instancio API), AHORA darle formato al PRECIO recibido

  return newPrice;
};

//conectarnos al server
//promesas
window
.fetch(`${baseurl}/api/avo`)
//procesar la respuesta y convertir en json
.then(respuesta=>respuesta.json())
//JSON, tendremos data y renderizamos la info en el navegador
.then(responseJSON=>{

    const allsItems=[]

    responseJSON.data.forEach(item => {//por cada item, creara NODOS
        //create titulo, create image, create precio
        const imagen=document.createElement('img');
        imagen.className='h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6'
        imagen.src=`${baseurl}${item.image}`;

        const title=document.createElement('h1');
        title.textContent=item.name;//se agrega text al H2
        //title.style.fontSize='3rem'
        //title.className='muy-grande'//index.css MEDIANTE CLASES
        title.className='text-xs text-red-400 text-lg font-bold';//CLASE DEFINIDA EN TAILWIND CSS

        const price=document.createElement('button');
        price.className='text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-1 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800';
        price.textContent=item.price;
        price.textContent = formatPrice(item.price);//function is formatPrice

        const shape=document.createElement('h1')
        shape.textContent=item.attributes.shape;
        shape.className='font-semibold'
        
        const taste=document.createElement('h1')
        taste.textContent=item.attributes.taste;
        taste.className='italic font-semibold'

        const priceAndTitle = document.createElement("div");
        priceAndTitle.className = "text-center md:text-left";
        priceAndTitle.appendChild(title);
        priceAndTitle.appendChild(shape);
        priceAndTitle.appendChild(taste);
        priceAndTitle.appendChild(price)

        const card = document.createElement("div");
        card.className = "md:flex bg-white rounded-lg p-6 w-11/12 shadow-2xl";
        card.appendChild(imagen);
        card.appendChild(priceAndTitle);

        //document.body.appendChild(container) - uno por uno
        allsItems.push(card)
    });
    appNode.className='mt-10 grid grid-cols-2 gap-y-2.5 justify-items-center'//crea 2 columnas
    body.className='fondo'
    appNode.append(...allsItems)
})