import ReadyToSearch from "../../features/ReadyToSearch/ReadyToSearch";
import Loading from "../../features/Loading/Loading";
import SearchResults from "../../features/SearchResults/SearchResults";

const BottomPart = props => {

  if (props.loading) {
    return <Loading />
  } else {
    if (!props.fetchSuccess) {
      return <ReadyToSearch />
    } else {
      return <SearchResults />
    }
  }
}

export default BottomPart;