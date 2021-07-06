import React,{useState, useEffect}  from "react"
import {useDispatch,connect} from "react-redux"
import productsArr from "../data/products.json";
import {getProducts, searchProduct} from "../redux/actions/productActions"
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, TextField} from '@material-ui/core';
import DataTable from "../components/DataTable"

const useStyles = makeStyles(theme => ({
  pageContent: {
      margin: theme.spacing(6),
      padding: theme.spacing(3)
  },
  searchInput: {
      width: '75%'
  }
}))

const headCells = [
  { id: 'name', numeric: false, label: 'Product'},
  { id: 'price', numeric: true, label: 'Price' },
  { id: 'currency', numeric: false, label: 'Currency' },
  { id: 'article', numeric: true, label: 'Article', disableSorting: true },
]

function Input(props) {

  const { name, label, value,onChange} = props;
  return (
      <TextField
          variant="outlined"
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          fullWidth
      />
  )
}

function ProductsList(){
  const dispatch = useDispatch();

  useEffect(()=>{
   dispatch(getProducts(productsArr))
  },[dispatch])
 
 const classes = useStyles()
 
 const [records, setRecords] = useState(productsArr)
 const [filterFn, setFilterFn] = useState({ fn: items => { return items } })

 const {
  TblContainer,
  TblHead,
  TblPagination,
  recordsAfterPagingAndSorting
} = DataTable(records, headCells, filterFn);

 const handleSearch = e => {
 let target = e.target;
 searchProduct({search:e.target.value})
 setFilterFn({
      fn: items => {
          if (target.value === "")
              return items;
          else
              return items.filter(item => item.title.toLowerCase().includes(target.value))
      }
  })  
}

  return (
    <>
  <Paper className={classes.pageContent}>
    
    <Toolbar>
        <Input
            label="Search product"
            className={classes.searchInput}
            InputProps={{
                startAdornment: (<InputAdornment position="start">
              </InputAdornment>)
            }}
            onChange={handleSearch}
        />
      
    </Toolbar>
    <TblContainer>
      <TblHead />
          <TableBody>
            {
                recordsAfterPagingAndSorting().map(item =>
                    (<TableRow key={item.article}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.currency}</TableCell>
                        <TableCell>{item.article}</TableCell>
                    </TableRow>)
                )
            }
        </TableBody>
      </TblContainer>
    <TblPagination />
</Paper>
</>
)
  
}
const mapStateToProps = (state) => ({
  products: state.products.products,
  search: state.text
}
);

const mapDispatchToProps = {
     searchProduct
  }

export default connect(mapStateToProps, mapDispatchToProps) (ProductsList)