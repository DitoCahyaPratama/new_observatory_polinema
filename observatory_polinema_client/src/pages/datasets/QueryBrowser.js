import React, { Component } from 'react';
import { Button, Dropdown, Input, Table, Menu, Divider, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import dataImdb from '../../data/IMDb.json'
import dataFederated from '../../data/Federated.json'

const { TextArea } = Input;

export default class QueryBrowser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: '',
			searchedColumn: '',
			columns: [],
			dataSource: [],
		};

	}
	componentDidMount(){
		const dataColumns = [];
		const dataSource = [];
		dataImdb.head.vars.map((item, key) => {
			let obj = {};
			if(key === 0){
				obj = {
					title: item,
					width: 100,
					dataIndex: item,
					key: item,
					fixed: 'left',
					...this.getColumnSearchProps(item),
				};
			}else{
				obj = {
					title: item,
					dataIndex: item,
					key: item,
					...this.getColumnSearchProps(item),
				};
			}
				// obj = {
				// 	title: item,
				// 	dataIndex: item,
				// 	key: item,
				// 	...this.getColumnSearchProps(item),
				// };
			dataColumns.push(obj)
		})
		dataImdb.results.bindings.map((item, key) => {
			const obj = {
				movieid: item.movieid.value,
				dbpedia: item.dbpedia.value,
				title: item.title.value,
				mpaa: item.mpaa.value,
				metascore: item.metascore.value,
				won_oscar: item.won_oscar.value,
				nominated_oscar: item.nominated_oscar.value,
				won_gg: item.won_gg.value,
				nominated_gg: item.nominated_gg.value,
				competition: item.competition.value,
				sum_actors_rank: item.sum_actors_rank.value,
				sum_actress_rank: item.sum_actress_rank.value,
				avg_cinematgrs_rank: item.avg_cinematgrs_rank.value,
				avg_composers_rank: item.avg_composers_rank.value,
				avg_costdesigners_rank: item.avg_costdesigners_rank.value,
				avg_directors_rank: item.avg_directors_rank.value,
				sum_distributors_rank: item.sum_distributors_rank.value,
				avg_editors_rank: item.avg_editors_rank.value,
				avg_prodcompanies_rank: item.avg_prodcompanies_rank.value,
				avg_proddes_rank: item.avg_proddes_rank.value,
				avg_producers_rank: item.avg_producers_rank.value,
				avg_writers_rank: item.avg_writers_rank.value,
				opening_gross: '',
				opening_theaters: '',
			};
			// const obj = {
			// 	movieid: item.movieid.value,
			// 	movietitle: item.movietitle.value,
			// 	director: item.director.value,
			// 	notableworks: item.notableworks.value,
			// };
			dataSource.push(obj)
		})
		this.setState({
			columns: dataColumns,
			dataSource: dataSource,
		})

	}
	getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						this.searchInput = node;
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ width: 188, marginBottom: 8, display: 'block' }}
				/>
				<Button
					type="primary"
					onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
					icon="search"
					size="small"
					style={{ width: 90, marginRight: 8 }}
				>
					Search
				</Button>
				<Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
					Reset
				</Button>
			</div>
		),
		filterIcon: (filtered) => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => this.searchInput.select());
			}
		},
		render: (text) =>
			this.state.searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[this.state.searchText]}
					autoEscape
					textToHighlight={text.toString()}
				/>
			) : (
				text
			),
	});

	handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		this.setState({
			searchText: selectedKeys[0],
			searchedColumn: dataIndex,
		});
	};
	render() {
		const {columns, dataSource} = this.state
		// console.log(columns)
		const menu = (
			<Menu>
				<Menu.Item>
					<a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
						CSV
					</a>
				</Menu.Item>
				<Menu.Item>
					<a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
						JSON
					</a>
				</Menu.Item>
				<Menu.Item>
					<a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
						XLS
					</a>
				</Menu.Item>
			</Menu>
		);
		return (
			<>
				<div class="form-group">
					<label for="description">Query Statement</label>
					<TextArea placeholder="SELECT * FROM ..." allowClear />
				</div>
				<div class="text-center pb-4">
					<Button type="primary">Execute</Button>
					<Dropdown overlay={menu} trigger={['click']} placement="bottomLeft" className="ml-4">
						<Button>
							Export <Icon type="down" />
						</Button>
					</Dropdown>
				</div>
				<Table columns={columns} dataSource={dataSource} scroll={{ x: 3000, y: 300 }} />
				{/* <Table columns={columns} dataSource={dataSource} /> */}

			</>
		);
	}
}
