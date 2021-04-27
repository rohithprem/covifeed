

export class FilterDropDown extends React.Component {

    constructor(props){
        super(props);
        this.setState({
            isLoaded: false,
            data: [
                {
                    id: 0,
                    title: "Element 1",
                    selected: false
                },
                {
                    id: 1,
                    title: "Element 2",
                    selected: false
                },
                {
                    id: 2,
                    title: "Element 3",
                    selected: false
                },
                {
                    id: 3,
                    title: "Element 4",
                    selected: false
                }
            ],
            isListOpen: false,
            label: this.props.label,
            helpText: this.props.helpText
        });
    }

    toggleList () {
        this.setState(prevState => ({
            isListOpen: !prevState.isListOpen
        }))
    }

    selectItem = (item) => {
        const { resetThenSet } = this.props;
        const { title, id, key } = item;

        this.setState({
            headerTitle: title,
            isListOpen: false,
        }, () => resetThenSet(id, key));
    }

    render() {
        return (
            <div className="dd-wrapper">
                <button
                    type="button"
                    className="dd-header"
                    onClick={this.toggleList.bind(this)}
                >
                    <div className="dd-header-title">{headerTitle}</div>
                    {isListOpen
                        ? <FontAwesome name="angle-up" size="2x" />
                        : <FontAwesome name="angle-down" size="2x" />}
                </button>
                {isListOpen && (
                    <div
                        role="list"
                        className="dd-list"
                    >
                        {list.map((item) => (
                            <button
                                type="button"
                                className="dd-list-item"
                                key={item.id}
                                onClick={() => this.selectItem(item)}
                            >
                                {item.title}
                                {' '}
                                {item.selected && <FontAwesome name="check" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default FilterDropDown;

