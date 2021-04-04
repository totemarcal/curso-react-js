import React, {useState} from 'react'
import ProductTable from './ProductTable'
import SearchBar from './SearchBar'


const FilterableProductTable = (props) => {
    const [filterText, setFilterText] = useState('')
    const [inStockOnly, setInStockOnly] = useState(false)
      
    const handleFilterTextChange = (text) => {
      setFilterText(text)
    }
    
    const handleInStockChange = (inStock) => {
      setInStockOnly(inStock)
    }
  
      return (
        <div>
          <SearchBar
            filterText={filterText}
            inStockOnly={inStockOnly}
            onFilterTextChange={handleFilterTextChange}
            onInStockChange={handleInStockChange}
          />
          <ProductTable
            products={props.products}
            filterText={filterText}
            inStockOnly={inStockOnly}
          />

        </div>
      );
    }

  export default FilterableProductTable