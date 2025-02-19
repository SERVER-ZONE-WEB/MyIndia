class RatingSystem {
  constructor() {
    this.stars = document.querySelectorAll(".star-btn");
    this.ratingValue = document.querySelector(".rating-value");
    this.ratingLabel = document.querySelector(".rating-label");
    this.ratingFeedback = document.querySelector(".rating-feedback");
    this.currentRating = 0;

    this.feedbackTexts = {
      0: "Select Rating",
      1: "Poor - We'll work hard to improve",
      2: "Fair - Thanks for the feedback",
      3: "Good - We appreciate your rating",
      4: "Very Good - Thanks for the high rating!",
      5: "Excellent - We're thrilled you loved it!",
    };

    this.init();
  }

  init() {
    this.stars.forEach((star) => {
      // Hover effect
      star.addEventListener("mouseover", () => this.handleHover(star));
      star.addEventListener("mouseout", () => this.handleMouseOut());

      // Click handling
      star.addEventListener("click", () => this.handleClick(star));
    });
  }

  handleHover(starElement) {
    const rating = parseInt(starElement.dataset.rating);
    this.highlightStars(rating);
    this.updateRatingDisplay(rating);
    this.ratingLabel.textContent = starElement.title;
  }

  handleMouseOut() {
    this.highlightStars(this.currentRating);
    this.updateRatingDisplay(this.currentRating);
    this.ratingLabel.textContent = this.feedbackTexts[this.currentRating];
  }

  handleClick(starElement) {
    const rating = parseInt(starElement.dataset.rating);
    this.currentRating = rating;
    this.highlightStars(rating);
    this.updateRatingDisplay(rating);
    this.showFeedback(rating);

    // Animation effect
    starElement.style.transform = "scale(1.3)";
    setTimeout(() => {
      starElement.style.transform = "scale(1)";
    }, 200);
  }

  highlightStars(rating) {
    this.stars.forEach((star) => {
      const starRating = parseInt(star.dataset.rating);
      star.classList.toggle("active", starRating <= rating);
      star.classList.toggle("selected", starRating <= this.currentRating);
    });
  }

  updateRatingDisplay(rating) {
    if (this.ratingValue) {
      this.ratingValue.textContent = rating.toFixed(1);
      // Add animation class
      this.ratingValue.classList.add("rating-update");
      setTimeout(() => {
        this.ratingValue.classList.remove("rating-update");
      }, 300);
    }
  }

  showFeedback(rating) {
    if (this.ratingFeedback) {
      this.ratingFeedback.textContent = this.feedbackTexts[rating];
      this.ratingFeedback.style.opacity = "0";
      setTimeout(() => {
        this.ratingFeedback.style.opacity = "1";
      }, 50);
    }
  }
}

// Initialize rating system
document.addEventListener("DOMContentLoaded", () => {
  const ratingSystem = new RatingSystem();
});
