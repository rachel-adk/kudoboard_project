import "./Category.css"

const Category = ({ onCategoryChange }) => {
    const categories = [
        "All",
        "Recent",
        "Celebration",
        "Thank you",
        "Inspiration",
    ];

    return (
        <div className="category-buttons">
            {categories.map((category) => (
                <button
                    key={category}
                    className="category-button"
                    onClick={() => onCategoryChange(category === "All" ? "" : category)}
                    >
                        {category}
                    </button>
            ))}
        </div>
    )
}

export default Category
