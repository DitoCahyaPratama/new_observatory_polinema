import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Footer from '../components/Footer'
import Scroll from '../components/Scroll'
import Modal from '../components/Modal'
import { Link } from 'react-router-dom'

import OwlCarousel from 'react-owl-carousel2';

class Datasets_Detail extends Component {
    constructor(props) {
        super(props);

        //This state use for Mysql, Comment, Citation, API

        this.state = {
            // This state for Mysql
            query: '',
            result: '',
            // This state for MongoDB
            collection: '',
            mongoQuery: '',
            project: '',
            skip: '',
            limit: '',
            sort: '',
            // This state for Comment
            comment: '',
            // Citation
            author: '',
            title: '',
            year: '',
            publisher: '',
            volume: '',
            // API
            code: '',
            //Other
            errors: [],
            loading: false,
            succes: ''
        }
    }
    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleInputError = (errors, inputName) => {
        return errors.some(error =>
            error.message.toLowerCase().includes(inputName)
        )
            ? 'error'
            : ''
    }

    // This function for MySQL

    handleExecuteMysql = event => {
        var data1 = {
            query: this.state.query
        }
        if (this.isFormExecuteMysqlValid(this.state)) {
            this.setState({ errors: [], loading: true })

        }
    }

    isFormExecuteMysqlValid = ({ query }) => query

    // End function for MySQL


    // This function for MongoDB

    handleExecuteMongoDB = event => {
        var data1 = {
            collection: this.state.collection,
            mongoQuery: this.state.mongoQuery,
            project: this.state.project,
            skip: this.state.skip,
            limit: this.state.limit,
            sort: this.state.sort,
        }
        if (this.isFormExecuteMongoValid(this.state)) {
            this.setState({ errors: [], loading: true })

        }
    }

    isFormExecuteMongoValid = ({ collection, mongoQuery, project, skip, limit, sort }) => collection && mongoQuery && project && skip && limit && sort

    // End function for MongoDB


    // This function for comment

    handleExecuteComment = event => {
        var data1 = {
            comment: this.state.comment
        }
        if (this.isFormExecuteCommentValid(this.state)) {
            this.setState({ errors: [], loading: true })

        }
    }

    isFormExecuteCommentValid = ({ comment }) => comment

    // End function for comment


    // This function for citation

    handleExecuteCitation = event => {
        var data1 = {
            author: this.state.author,
            title: this.state.title,
            year: this.state.year,
            publisher: this.state.publisher,
            volume: this.state.volume,
        }
        if (this.isFormExecuteCitation(this.state)) {
            this.setState({ errors: [], loading: true })

        }
    }

    isFormExecuteCitation = ({ author, title, year, publisher, volume }) => author && title && year && publisher && volume

    // End function for citation

    // This function for API

    handleExecuteAPI = event => {
        var data1 = {
            code: this.state.code
        }
        if (this.isFormExecuteAPI(this.state)) {
            this.setState({ errors: [], loading: true })

        }
    }

    isFormExecuteAPI = ({ code }) => code

    // End function for API

    render() {
        const {
            query, result,
            collection, mongoQuery, project, skip, limit, sort,
            comment,
            author, title, year, publisher, volume,
            code,
            errors, loading } = this.state;
        const options = {
            items: 12,
            nav: true,
            autoplay: true,
            dots: true,
            loop: true
        }
        const collectionOption = [
            { key: '1', text: '1', value: '1' },
            { key: '2', text: '2', value: '2' },
            { key: '3', text: '3', value: '3' },
        ]

        return (
            <div>
                {/* <div id="wrapper">
                    <Sidebar />
                    <div id="content-wrapper" class="d-flex flex-column">
                        <div id="content">
                            <Topbar />
                            <div class="container-fluid">
                                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 class="h3 mb-0 text-gray-800">My Profile</h1>
                                </div>

                                <div class="row justify-content-center">
                                    <div class="col-xl-12 col-lg-12">
                                        <div class="card o-hidden border-0 my-5">
                                            <div class="card-body p-0">
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div class="p-5">
                                                            <nav>
                                                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                                                    <a class="nav-item nav-link active" id="nav-file-tab" data-toggle="tab" href="#nav-file" role="tab" aria-controls="nav-home" aria-selected="true">File</a>
                                                                    <a class="nav-item nav-link" id="nav-mysql-tab" data-toggle="tab" href="#nav-mysql" role="tab" aria-controls="nav-profile" aria-selected="false">MySQL</a>
                                                                    <a class="nav-item nav-link" id="nav-mongodb-tab" data-toggle="tab" href="#nav-mongodb" role="tab" aria-controls="nav-contact" aria-selected="false">MongoDB</a>
                                                                    <a class="nav-item nav-link" id="nav-comments-tab" data-toggle="tab" href="#nav-comments" role="tab" aria-controls="nav-contact" aria-selected="false">Comments</a>
                                                                    <a class="nav-item nav-link" id="nav-citation-tab" data-toggle="tab" href="#nav-citation" role="tab" aria-controls="nav-contact" aria-selected="false">Citation</a>
                                                                    <a class="nav-item nav-link" id="nav-api-tab" data-toggle="tab" href="#nav-api" role="tab" aria-controls="nav-contact" aria-selected="false">API</a>
                                                                </div>
                                                            </nav>
                                                            <div class="tab-content" id="nav-tabContent">
                                                                <div class="tab-pane fade show active" id="nav-file" role="tabpanel" aria-labelledby="nav-file-tab">
                                                                    <div class="text-center p-4">
                                                                        <h4>Dataset A</h4>
                                                                        <Rating maxRating={5} defaultRating={3} icon='star' size='massive' />
                                                                        <p class="p-2">Status | Type</p>
                                                                        <OwlCarousel options={options}>
                                                                            <div class="item"><h4>1</h4></div>
                                                                            <div class="item"><h4>2</h4></div>
                                                                            <div class="item"><h4>3</h4></div>
                                                                            <div class="item"><h4>4</h4></div>
                                                                            <div class="item"><h4>5</h4></div>
                                                                            <div class="item"><h4>6</h4></div>
                                                                            <div class="item"><h4>7</h4></div>
                                                                            <div class="item"><h4>8</h4></div>
                                                                            <div class="item"><h4>9</h4></div>
                                                                            <div class="item"><h4>10</h4></div>
                                                                            <div class="item"><h4>11</h4></div>
                                                                            <div class="item"><h4>12</h4></div>
                                                                        </OwlCarousel>
                                                                        <div class="card mb-4 m-4">
                                                                            <div class="card-header py-3">
                                                                                <h6 class="m-0 font-weight-bold text-primary">Description</h6>
                                                                            </div>
                                                                            <div class="card-body">
                                                                                The styling for this basic card example is created by using default Bootstrap utility classes. By using utility classes, the style of the card component can be easily modified with no need for any custom CSS!
                                                                            </div>
                                                                        </div>
                                                                        <p>Download Here</p>
                                                                        <span class="fas fa-cloud-download-alt fa-4x"></span>
                                                                    </div>
                                                                </div>
                                                                <div class="tab-pane fade" id="nav-mysql" role="tabpanel" aria-labelledby="nav-mysql-tab">
                                                                    <div class="text-center p-4">
                                                                        <h4>Dataset A</h4>
                                                                        <Rating maxRating={5} defaultRating={3} icon='star' size='massive' />
                                                                        <p class="p-2">Status | Type</p>
                                                                    </div>
                                                                    <div class="text-left p-4">
                                                                        <Form size="large" onSubmit={this.handleExecuteMysql}>
                                                                            <Form.TextArea fluid name="query" label='Query' placeholder='SELECT * FROM .....' onChange={this.handleChange} value={query} className={this.handleInputError(errors, 'query')} style={{ minHeight: 100 }} />
                                                                            <Divider section />
                                                                            <div class="text-center">
                                                                                <Button disabled={loading} className={loading ? 'loading' : ''} color="blue" size="large">Execute</Button>
                                                                            </div>
                                                                        </Form>
                                                                        {errors.length > 0 && (
                                                                            <Message error>
                                                                                <h3>Error</h3>
                                                                                {this.displayErrors(errors)}
                                                                            </Message>
                                                                        )}
                                                                        <Form size="large">
                                                                            <Form.TextArea fluid name="query" label='Query' placeholder='Table' value={query} style={{ minHeight: 100 }} disabled="true" />
                                                                        </Form>
                                                                    </div>
                                                                </div>
                                                                <div class="tab-pane fade" id="nav-mongodb" role="tabpanel" aria-labelledby="nav-mongodb-tab">
                                                                    <div class="text-center p-4">
                                                                        <h4>Dataset A</h4>
                                                                        <Rating maxRating={5} defaultRating={3} icon='star' size='massive' />
                                                                        <p class="p-2">Status | Type</p>
                                                                    </div>
                                                                    <div class="text-left p-4">
                                                                        <Form size="large" onSubmit={this.handleExecuteMongoDB}>
                                                                            <Form.Select fluid name="collection" label='Collection' options={collectionOption} value={collection} placeholder='Collection' onChange={this.handleChange} className={this.handleInputError(errors, 'collection')} />
                                                                            <Form.Input fluid name="mongoquery" label='MongoQuery' icon="database" iconPosition="left" placeholder="{}" onChange={this.handleChange} value={mongoQuery} className={this.handleInputError(errors, 'mongoquery')} type="mongoquery" />
                                                                            <Form.Input fluid name="project" label='Project' icon="pencil" iconPosition="left" placeholder='{"_id": 0}' onChange={this.handleChange} value={project} className={this.handleInputError(errors, 'project')} type="project" />
                                                                            <Form.Input fluid name="skip" label='Skip' icon="arrow right" iconPosition="left" placeholder="0" onChange={this.handleChange} value={skip} className={this.handleInputError(errors, 'skip')} type="skip" />
                                                                            <Form.Input fluid name="limit" label='Limit' icon="hand scissors outline" iconPosition="left" placeholder="10" onChange={this.handleChange} value={limit} className={this.handleInputError(errors, 'limit')} type="limit" />
                                                                            <Form.Input fluid name="sort" label='Sort' icon="sort amount down" iconPosition="left" placeholder="Sort" onChange={this.handleChange} value={sort} className={this.handleInputError(errors, 'sort')} type="sort" />
                                                                            <Divider section />
                                                                            <div class="text-center">
                                                                                <Button disabled={loading} className={loading ? 'loading' : ''} color="blue" size="large">Execute</Button>
                                                                            </div>
                                                                        </Form>

                                                                        {errors.length > 0 && (
                                                                            <Message error>
                                                                                <h3>Error</h3>
                                                                                {this.displayErrors(errors)}
                                                                            </Message>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div class="tab-pane fade" id="nav-comments" role="tabpanel" aria-labelledby="nav-comments-tab">
                                                                    <div class="text-center p-4">
                                                                        <h4>Dataset A</h4>
                                                                        <Rating maxRating={5} defaultRating={3} icon='star' size='massive' />
                                                                        <p class="p-2">Status | Type</p>
                                                                    </div>
                                                                    <div class="text-left p-4">
                                                                        <Form size="large" onSubmit={this.handleExecuteComment}>
                                                                            <Form.TextArea fluid name="comment" label='Comment' placeholder='Comment' onChange={this.handleChange} value={comment} className={this.handleInputError(errors, 'comment')} style={{ minHeight: 100 }} />
                                                                            <Divider section />
                                                                            <div class="text-center">
                                                                                <Button disabled={loading} className={loading ? 'loading' : ''} color="blue" size="large">Execute</Button>
                                                                            </div>
                                                                        </Form>
                                                                        {errors.length > 0 && (
                                                                            <Message error>
                                                                                <h3>Error</h3>
                                                                                {this.displayErrors(errors)}
                                                                            </Message>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div class="tab-pane fade" id="nav-citation" role="tabpanel" aria-labelledby="nav-citation-tab">
                                                                    <div class="text-right p-4">
                                                                        <Link to="/">Another Paper <i class="fas fa-plus"></i></Link>
                                                                    </div>
                                                                    <div class="text-center p-4">
                                                                        <h4>Dataset A</h4>
                                                                        <Rating maxRating={5} defaultRating={3} icon='star' size='massive' />
                                                                        <p class="p-2">Status | Type</p>
                                                                    </div>
                                                                    <div class="text-left p-4">
                                                                        <Form size="large" onSubmit={this.handleExecuteCitation}>
                                                                            <Form.Input fluid name="author" label='Author' icon="user" iconPosition="left" placeholder="Author" onChange={this.handleChange} value={author} className={this.handleInputError(errors, 'author')} type="author" />
                                                                            <Form.Input fluid name="title" label='Title' icon="pencil" iconPosition="left" placeholder="Title" onChange={this.handleChange} value={title} className={this.handleInputError(errors, 'title')} type="title" />
                                                                            <Form.Input fluid name="year" label='Year' icon="calendar" iconPosition="left" placeholder="Year" onChange={this.handleChange} value={year} className={this.handleInputError(errors, 'year')} type="year" />
                                                                            <Form.Input fluid name="publisher" label='Publisher' icon="book" iconPosition="left" placeholder="Publisher" onChange={this.handleChange} value={publisher} className={this.handleInputError(errors, 'publisher')} type="publisher" />
                                                                            <Form.Input fluid name="volume" label='Volume / Size' icon="file" iconPosition="left" placeholder="Volume" onChange={this.handleChange} value={volume} className={this.handleInputError(errors, 'volume')} type="volume" />
                                                                            <Divider section />
                                                                            <div class="text-center">
                                                                                <Button disabled={loading} className={loading ? 'loading' : ''} color="blue" size="large">Submit</Button>
                                                                            </div>
                                                                        </Form>
                                                                        {errors.length > 0 && (
                                                                            <Message error>
                                                                                <h3>Error</h3>
                                                                                {this.displayErrors(errors)}
                                                                            </Message>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div class="tab-pane fade" id="nav-api" role="tabpanel" aria-labelledby="nav-api-tab">
                                                                    <div class="text-center p-4">
                                                                        <h4>Dataset A</h4>
                                                                        <Rating maxRating={5} defaultRating={3} icon='star' size='massive' />
                                                                        <p class="p-2">Status | Type</p>
                                                                    </div>
                                                                    <div class="text-left p-4">
                                                                        <Form size="large" onSubmit={this.handleExecuteAPI}>
                                                                            <Form.TextArea fluid name="code" label='Code' placeholder='Code' onChange={this.handleChange} value={code} className={this.handleInputError(errors, 'code')} style={{ minHeight: 100 }} />
                                                                            <Divider section />
                                                                            <div class="text-center">
                                                                                <Button disabled={loading} className={loading ? 'loading' : ''} color="blue" size="large">Run</Button>
                                                                            </div>
                                                                        </Form>
                                                                        {errors.length > 0 && (
                                                                            <Message error>
                                                                                <h3>Error</h3>
                                                                                {this.displayErrors(errors)}
                                                                            </Message>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div> */}
                <Scroll />
                <Modal />
            </div>
        )
    }
}

export default Datasets_Detail
