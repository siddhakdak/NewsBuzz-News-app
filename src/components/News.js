import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'

export class News extends Component {



static defaultProps={
country: 'in',
pageSize: 5,
category: 'general'
  }

  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
      }
 
  constructor() {
    super();
    this.state ={
      articles: [],
      loading: false,
      page: 1
    }
  }
  

  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=d8913ee16c074c64a11d60876e46216b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    ;
    this.setState({loading: true});
    
        let data = await fetch(url);
        this.props.setProgress(30);
    
        let parsedData = await data.json()
        this.props.setProgress(70);
       
        this.setState({
    
        articles: parsedData.articles,
        loading: false
      })
      this.props.setProgress(100);
  }
  





  async componentDidMount() {

    this.updateNews();
  }
  


  handlePrevClick = async ()=>{
this.setState({page: this.state.page -1});
this.updateNews();

}

  handleNextClick = async ()=>{
    this.setState({page: this.state.page + 1});
  this.updateNews();
}

  render() {
    return (
      <div className="container my-3">
        <spinner/>
        <h1 className="text-center my-3">NewsBuzz top headlines</h1>
       {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" style={{padding: "15px"}} key={element.url}>
              <NewsItem title={element.title?element.title.slice(0, 40):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}
        </div>

        <div className='container my-5 d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">&laquo; Previous</button>
      
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button"  className="btn btn-dark" onClick={this.handleNextClick} >Next &raquo;</button>
        
        </div>
      </div>
    )
  }

}
export default News