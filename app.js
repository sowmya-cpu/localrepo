class Store{
    static getbooks(){
       //it takes the elements from the localStorage  and insert it array and return books 
        let books;
        if(localStorage.getItem('books') === 'null'){
            books =[];
        }
        else{
            books=JSON.parse(localStorage.getItem('books')); 
        }
        
        return books; 
    }

    static addbooks(book){
        //calls the getbooks in return the data stored in localstorage 
        const books= Store.getbooks();
        //it adds the book to the array 
       
        books.push(book); 
        
        //it add string book to the actual book in local store 
        localStorage.setItem('books',JSON.stringify(books)); 
      
    }
    static removebook(ISBn){
       const books =Store.getbooks();
       books.forEach((book,index) => 
        {
          if(book.ISBn === ISBn){
             books.splice(index,1); 
             
          }
        }
    
    );
    localStorage.setItem('books',JSON.stringify(books)); 
    
    }
}
class Book{
    constructor(title,author,ISBn){
        this.title=title;
        this.author=author;
        this.ISBn=ISBn;
    }
}
class UI{
   static display(){
    const books=Store.getbooks();
    books.forEach((book) => UI.addBooktoList(book)); 
   }

    /*
    static display(){
        const storedBooks=[
            {
                title:'Bookone',
               author:'sowmya',
                ISBn:'343434343434343434'


            },
            {
                title:'Booktwo',
                author:'traverse',
                ISBn:'88888888888'
            }
        ];
        const books=storedBooks; 
        books.forEach((book) => UI.addBooktoList(book));
    }*/
    
    static addBooktoList(book){
        const list=document.querySelector('#book-list') ;
        const row=document.createElement('tr');
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.ISBn}</td>
        <td><a class="btn btn-danger btn-sm delete">X</a></td>`
        ;
        list.appendChild(row);

    }
  static clearfield(){
   document.querySelector('#title').value= ' ';
   document.querySelector('#author').value= ' ';
   document.querySelector('#isbn').value= ' '  ;
  }
    



  static delete(element){
     if(element.classList.contains('delete')){
        element.parentElement.parentElement.remove();
     }
  }
  //it takes message and colour 
  static showAlert(message,className){
    //it creates one div element 
    const div=document.createElement('div');   
    //it adds the classname as alert alert-color 
    div.className=`alert alert-${className}`;
    //j it adds the node created by the createTextNode to the div 
    div.appendChild(document.createTextNode(message));
    //just pointing the container e
    const container=document.querySelector('.container'); 
    const form =document.querySelector('#book-form');
//it inserts the div before conatiner form 
    container.insertBefore(div, form );
    //vanishes in 3 
    setTimeout(() => document.querySelector('.alert').remove(),3000); 

  } 
}
  
    document.addEventListener('DOMContentLoaded',UI.display);
    //validate  
    document.querySelector('#book-form').addEventListener('submit',(e) => 
    {
    //prevent 
    e.preventDefault();
    const title=document.querySelector('#title').value;
    const author =document.querySelector('#author').value;
    const ISBn=document.querySelector('#isbn').value;
    if(title === ' ' || author === ' ' || ISBn === ' '){
        UI.showAlert('enter valid form ','danger');
    }
    else{
    //institalize book  

    const book=new Book(title,author,ISBn);
    UI.addBooktoList(book);
    Store.addbooks(book); 
    UI.showAlert('book added  ','success'); 
    //clear field    
    UI.clearfield(); 
    }
    
}
    );
    //remove the book 
    document.querySelector('#book-list').addEventListener('click',(e) => {
        UI.delete(e.target);
        Store.removebook(e.target.parentElement.previousElementSibling.textContent);
                UI.showAlert('book deleted  ','info ');
    }





);
