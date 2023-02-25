// Write your code here

import Loader from 'react-loader-spinner'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'failure',
  inProgress: 'IN-PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productDetails: {},
    orderQuantity: 1,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {id} = match.params

    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const modifiedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        rating: data.rating,
        totalReviews: data.total_reviews,
        description: data.description,
        availability: data.availability,
        brand: data.brand,
        similarProducts: data.similar_products,
      }

      this.setState({
        productDetails: modifiedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onDecreaseQuantity = () => {
    const {orderQuantity} = this.state
    if (orderQuantity > 1) {
      this.setState(prevState => ({orderQuantity: prevState.orderQuantity - 1}))
    }
  }

  onIncreaseQuantity = () => {
    this.setState(prevState => ({orderQuantity: prevState.orderQuantity + 1}))
  }

  onContinueShopping = () => {
    const {history} = this.props

    history.push('/products')
  }

  renderSimilarProducts = similarProductsList =>
    similarProductsList !== undefined ? (
      <ul className="similar-products-list">
        {similarProductsList.map(similarProduct => (
          <SimilarProductItem
            projectDetails={similarProduct}
            key={similarProduct.id}
          />
        ))}
      </ul>
    ) : null

  renderSuccessView = () => {
    const {productDetails, orderQuantity} = this.state
    const {
      imageUrl,
      title,
      price,
      rating,
      totalReviews,
      description,
      availability,
      brand,
      similarProducts,
    } = productDetails
    return (
      <div className="product-details-container">
        <div className="product-img-details-container">
          <img className="product-img" src={imageUrl} alt="product" />
          <div>
            <h1 className="product-title">{title}</h1>
            <p className="product-price">Rs {price}/-</p>
            <div className="rating-review-container">
              <div className="rating-star-container">
                <p className="rating">{rating}</p>
                <img
                  className="star-img"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </div>
              <p className="reviews-count">{totalReviews} Reviews</p>
            </div>
            <p className="description">{description}</p>
            <p className="product-availability">Available: {availability}</p>
            <p className="product-brand">Brand: {brand}</p>
            <hr />
            <div className="order-quantity-container">
              <button
                className="minus-icon"
                type="button"
                data-testid="minus"
                onClick={this.onDecreaseQuantity}
              >
                <BsDashSquare />
              </button>
              <p className="order-quantity">{orderQuantity}</p>
              <button
                className="plus-icon"
                type="button"
                data-testid="plus"
                onClick={this.onIncreaseQuantity}
              >
                <BsPlusSquare />
              </button>
            </div>
            <button type="button" className="add-to-cart-btn">
              ADD TO CART
            </button>
          </div>
        </div>
        <div>
          <h1 className="similar-products-heading">Similar Products</h1>
          {this.renderSimilarProducts(similarProducts)}
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        className="error-view-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <h1>Product Not Found</h1>
      <button
        className="continue-shopping-btn"
        type="button"
        onClick={this.onContinueShopping}
      >
        Continue Shopping
      </button>
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="product-details-header-container">
        <Header />
        {this.renderApiStatus()}
      </div>
    )
  }
}

export default ProductItemDetails
