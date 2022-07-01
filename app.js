const baseurl='https://api.tvmaze.com/search/shows?q=';
const form=document.querySelector('form');
const ressection=document.querySelector("#res");

const removeImages=(ressection)=>{
 //Removes all the child nodes of result section
 const images=ressection.children;
 while(ressection.firstChild){
  ressection.firstChild.remove();
 }
}

const getMovies=(searchText)=>{
 axios.get(`${baseurl}${searchText}`)
  .then((res)=>{
   //res is a promise
   const movies=res.data;
   //movies will store array of movies so go to each using for of loop
   for(let movie of movies){
    if(movie.show.image!=null){
     const image=document.createElement('img');
     image.setAttribute('src',movie.show.image.medium);
     ressection.append(image);
    }
   }
  })
  .catch((error)=>{
   console.log(error);
   console.log("Something went wrong");
  });
}

form.addEventListener('submit',(e)=>{
 e.preventDefault();//To prevent default submit
 const searchText=form.children[0].value;
 removeImages(ressection);
 getMovies(searchText);
 form.children[0].value="";
});