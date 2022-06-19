import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {                   
   static defaultProps = {
     country: 'in',
     pageSize:9,
     category:'science'
   }
   PropTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category: PropTypes.string
  }
 capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props);
    this.state = {
      articles:[],
      loading:true,
      page:1,
      totalResults:0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }
  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles:parseData.articles,
      totalResults:parseData.totalResults,
      loading:false
    });
    this.props.setProgress(100);
  }
  
  async componentDidMount(){
    /*
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a84d78af1a444bf9bcd939a28c14afa&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles:parseData.articles,
      totalResults:parseData.totalResults,
      loading:false
    })
    */
  this.updateNews();

    
  }

   handleprevClick = async () =>{
   /*
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a84d78af1a444bf9bcd939a28c14afa&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      page:this.state.page - 1,
      articles:parseData.articles,
      loading:false
    })
    */
   this.setState({page:this.state.page - 1});
   this.updateNews()
   
}
 handleNextClick = async () =>{
   /*
    console.log('Next');
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a84d78af1a444bf9bcd939a28c14afa&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
   
    this.setState({
      page:this.state.page + 1,
      articles:parseData.articles,
       loading:false
    })
  
  }
  */
  this.setState({page:this.state.page + 1});
  this.updateNews();

}
 fetchMoreData = async () => {

 const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
 this.setState({page:this.state.page +1});
 let data = await fetch(url);
 let parseData = await data.json();
 this.setState({
   articles:this.state.articles.concat(parseData.articles),
   totalResults:parseData.totalResults
 });
};

  render() {
    return (
      <>
        <h1 className="my-5 py-4 mb-5 text-center" >NewsMonkey - Top  {this.capitalizeFirstLetter(this.props.category)} Headlines In Everyday</h1> 
       
        {this.state.loading && <Spinner/>}
          {/*!this.state.loading &&*/ }
      
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>} >
        <div className="container"> 
        <div className='row row-cols-1 row-cols-md-3 '>
             { this.state.articles.map( (element) =>{
              return <div className="col " key={element.url}>
              <NewsItem  title={element.title?element.title.slice(0,41):''} description={element.description? element.description.slice(0,95):''} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                      </div>

              })}
       </div> 
       </div>  
       </InfiniteScroll>
     
       {/*<div className="container d-flex justify-content-between">
       <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprevClick}>&larr;Previous</button>
       <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div> */ }
      </>
    )
  }
}

export default News
