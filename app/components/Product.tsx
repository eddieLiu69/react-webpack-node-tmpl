import * as React from 'react';
import * as styles from './test.css';

class ProductCategoryRow extends React.Component<any, any> {
    render() {
        
        return (<tr><th className={styles.text} colSpan={2}>{this.props.category}</th></tr>);
    }
}

class ProductRow extends React.Component<any, any> {
    render() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{ color: 'red' }}>{this.props.product.name}</span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}

class ProductTable extends React.Component<any, any> {
    render() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach((product) => {
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component<any, any> {
    handleChange = () => {
        this.props.onUserInput(
            (this.refs["filterTextInput"] as any).value,
            (this.refs["inStockOnlyInput"]  as any).checked
        );
    }
    
    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                />
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.inStockOnly}
                        ref="inStockOnlyInput"
                        onChange={this.handleChange}
                        />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
};

class FilterableProductTable extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state =  {
            filterText: '',
            inStockOnly: false,
            products: []
        };
    }
    
    componentWillMount = () => {
        this.setState({ products: PRODUCTS});
    };

    handleUserInput = (filterText, inStockOnly) => {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    };

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput}
                    />
                <ProductTable
                    products={this.state.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    />
            </div>
        );
    }
}


var PRODUCTS = [
    { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
    { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
    { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
    { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
    { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
    { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' },
    { category: 'Electronics', price: '$299.99', stocked: true, name: 'Nexus 8' }
];

export default FilterableProductTable;