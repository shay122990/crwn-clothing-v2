import { CategoryContainer, Title } from "./category.styles";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";
import ProductCard from "../../components/product-card/product-card.component";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      {isLoading ? (
        <Spinner></Spinner>
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
