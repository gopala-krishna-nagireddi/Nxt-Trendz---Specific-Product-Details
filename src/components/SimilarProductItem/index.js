// Write your code here

import './index.css'

const SimilarProductItem = props => {
  const {projectDetails} = props
  const modifiedProductDetails = {
    id: projectDetails.id,
    imageUrl: projectDetails.image_url,
    title: projectDetails.title,
    price: projectDetails.price,
    rating: projectDetails.rating,
    totalReviews: projectDetails.total_reviews,
    description: projectDetails.description,
    availability: projectDetails.availability,
    brand: projectDetails.brand,
    style: projectDetails.style,
  }

  const {imageUrl, title, price, rating, brand} = modifiedProductDetails
  return (
    <li className="similar-product-item">
      <img
        className="similar-img"
        src={imageUrl}
        alt={`similar product ${title}`}
      />
      <p className="similar-product-title">{title}</p>
      <p className="brand-name">by {brand}</p>
      <div className="price-rating-details-container">
        <p className="price">Rs {price}/-</p>
        <div className="rating-star-container">
          <p className="rating">{rating}</p>
          <img
            className="star-img"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
