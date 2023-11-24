import ReadyToSearch from "../../features/ReadyToSearch/ReadyToSearch";
import Loading from "../../features/Loading/Loading";
import SearchResults from "../../features/SearchResults/SearchResults";

const BottomPart = props => {

  if (props.loading) {
    return <Loading />
  } else {
    if (!props.success) {
      return <ReadyToSearch inputOK={props.inputOK} />
    } else {
      return <SearchResults inputOK={props.inputOK} />
    }
  }
}

export default BottomPart;