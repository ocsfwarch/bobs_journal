interface IProps {
  status: string;
}

const Status: React.FC<IProps> = (props: IProps) => {
  return <section className="status">{props.status}</section>;
};

export default Status;
