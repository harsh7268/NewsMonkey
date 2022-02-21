import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
     
       <div className="card my-2" >
  <img src={imageUrl?imageUrl:'https://images.indianexpress.com/2022/02/OnePlus-Nord-CE-2-5G.jpg'} className="card-img-top" alt="..." style={{height:'300px'}} />
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <span className="badge bg-primary">{source}</span>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">by {author?author:'Unknow'} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl}  className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>

    )
  }
}

export default NewsItem
