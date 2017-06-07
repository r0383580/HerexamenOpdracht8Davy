
module.exports =  {
  books : {},
  
  saveBook : function(book){
    this.books[book.id]= book;
  },
  listAllBooks : function(){
    var rtnValue =[];
    for (var item in this.books) {
      rtnValue.push(this.books[item]);
    };
    return rtnValue;
  },
  findBook : function(id){
    return this.books[id];
  }
};