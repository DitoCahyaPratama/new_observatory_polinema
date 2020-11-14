import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Sidebar extends Component {
    state={
        sidebar:false
    }
    handleSidebar = () => {
        this.setState({sidebar : !this.state.sidebar})
    }
    render() {
        return (
            <div>
                <ul class={this.state.sidebar?"navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled":"navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"} id="accordionSidebar">
                    <Link class="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                        <div class="sidebar-brand-icon">
                        <img src="/img/Polinema.png" width="100" height="60" class="d-inline-block align-top" alt="" />
                        </div>
                        {/* <div class="sidebar-brand-text mx-3">Polinema</div> */}
                    </Link>

                    <hr class="pt-10" />

                    <hr class="sidebar-divider my-0" />

                    <li class="nav-item">
                        <Link class="nav-link" to="/dashboard">
                            <i class="fas fa-fw fa-home"></i>
                            <span>Home</span></Link>
                    </li>

                    <hr class="sidebar-divider" />

                    <div class="sidebar-heading">
                    Master
                    </div>

                    <li class="nav-item">
                        <Link class="nav-link" to="/datasets">
                            <i class="fas fa-fw fa-chart-area"></i>
                            <span>Datasets</span>
                        </Link>
                    </li>

                    <li class="nav-item">
                        <Link class="nav-link" to="/discussion">
                            <i class="far fa-fw fa-comments"></i>
                            <span>Discussion</span>
                        </Link>
                    </li>

                    <li class="nav-item">
                        <Link class="nav-link" to="/citation">
                            <i class="fas fa-fw fa-quote-right"></i>
                            <span>Citation</span>
                        </Link>
                    </li>

                    <li class="nav-item">
                        <Link class="nav-link" to="/about">
                            <i class="fas fa-fw fa-exclamation-circle"></i>
                            <span>About</span>
                        </Link>
                    </li>

                    <hr class="sidebar-divider d-none d-md-block" />

                    <div class="text-center d-none d-md-inline">
                        <button class="rounded-circle border-0" id="sidebarToggle" onClick={this.handleSidebar}></button>
                    </div>
                </ul>
            </div>
        )
    }
}

export default Sidebar
