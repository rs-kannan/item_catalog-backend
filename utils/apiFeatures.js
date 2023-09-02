class APIFeatures{
   constructor(query,queryStr){
    this.query = query;
    this.queryStr = queryStr;
   }

   search(){
     let keyword = this.queryStr.keyword ?{
        name :{
            $regex : this.queryStr.keyword,
            $options : 'i'
        }
     } :{};

     this.query.find({...keyword})
     return this;
   }

   filter(){
      const querystrCopy = { ...this.queryStr};
     
     const removeFields = ['keyword','limit','page'];
     removeFields.forEach(field =>delete querystrCopy[field]);

     let queryStr = JSON.stringify(querystrCopy);
     queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g, match =>`$${match}`)
      console.log(queryStr)
     this.query.find(JSON.parse(queryStr));
     return this;
   }
}

module.exports = APIFeatures;