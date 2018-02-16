//NOTE react-bootstrap caused errors so the module was removed. This needs to be refactored

// import React from 'react';
// import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
//
// import MenuItem from 'react-bootstrap/lib/MenuItem';
// import FormGroup from 'react-bootstrap/lib/FormGroup';
// import FormControl from 'react-bootstrap/lib/FormControl';
// import Button from 'react-bootstrap/lib/Button';
// import Nav from 'react-bootstrap/lib/Nav';
// import Navbar from 'react-bootstrap/lib/Navbar';
// import NavDropdown from 'react-bootstrap/lib/NavDropdown';
//
// class NaviBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       open: false,
//       userField: '',
//       passField: ''
//     };
//   }
//
//   componentDidMount() {}
//
//   dropdownToggle(event) {
//     this.setState({ open: !this.state.open });
//   }
//
//   userType(event) {
//     var value = event.target.value;
//     this.setState({ userField: value });
//   }
//   passType(event) {
//     var value = event.target.value;
//     this.setState({ passField: value });
//   }
//
//   render() {
//     var accountStuff;
//     if (!this.props.loggedIn) {
//       accountStuff = (
//         <NavDropdown
//           open={this.state.open}
//           onClick={event => this.dropdownToggle(event)}
//           onToggle={() => {}}
//           className="dropdown-toggle"
//           title="Account"
//           id="basic-nav-dropdown">
//           <MenuItem>
//             <Navbar.Form>
//               <FormGroup>
//                 <FormControl
//                   onChange={e => this.userType(e)}
//                   type="text"
//                   placeholder="Username"
//                 />
//                 <FormControl
//                   onChange={e => this.passType(e)}
//                   type="password"
//                   placeholder="Password"
//                 />
//               </FormGroup>{' '}
//             </Navbar.Form>
//           </MenuItem>
//           <MenuItem divider />
//           <MenuItem>
//             <Navbar.Form>
//               <Button
//                 type="submit"
//                 onClick={e =>
//                   this.props.loginCB(this.state.userField, this.state.passField)
//                 }>
//                 Login
//               </Button>
//               <Button
//                 type="submit"
//                 onClick={e =>
//                   this.props.creatAcctCB(
//                     this.state.userField,
//                     this.state.passField
//                   )
//                 }>
//                 Create Acct
//               </Button>
//             </Navbar.Form>
//           </MenuItem>
//         </NavDropdown>
//       );
//     } else {
//       accountStuff = (
//         <Button type="submit" onClick={e => this.props.logoutCB()}>
//           Logout
//         </Button>
//       );
//     }
//     return (
//       <Navbar className="navbar navbar-inverse">
//         <Navbar.Header>
//           <Navbar.Brand>
//             <a href="/member">MuseTrap</a>
//           </Navbar.Brand>
//         </Navbar.Header>
//         <Nav pullRight>{accountStuff}</Nav>
//       </Navbar>
//     );
//   }
// }
//
// export default NaviBar;
