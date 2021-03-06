import { Button } from "antd-mobile"
import { LeftOutline } from 'antd-mobile-icons';
import { HomeOutlined, LoginOutlined, LogoutOutlined }from '@ant-design/icons';
import './index.css';


const navBarBottom = (props) => {
	return (
		<div className="common--nav-bar">
			{(() => {
				if (props.hasOwnProperty("homeBtnForLogin")) {
					return (
						<Button fill="none" onClick={() => {
							window.location.hash = "#/login"
						}}>
							<div className="nav-bar--btn-icon-cont">
								<LoginOutlined />
							</div>
							<p className="nav-bar--btn-desc">Login</p>
						</Button>
					)
				} else {
					return (
						<Button fill="none" onClick={() => {
							window.location.hash = "#/home"
						}}>
							<div className="nav-bar--btn-icon-cont">
								<HomeOutlined />
							</div>
							<p className="nav-bar--btn-desc">Home</p>
						</Button>
					)
				}
			})()}

			{(() => {
				if (props.hasOwnProperty("showLogout")) {
					// Print logout button
					return (
						<Button fill="none" onClick={() => {
							window.location.hash = "#/logout";
						}}>
							<div className="nav-bar--btn-icon-cont">
								<LogoutOutlined />
							</div>
							<p className="nav-bar--btn-desc">Logout</p>
						</Button>
					);
				}
				return (<></>);
			})()}

			<Button fill="none" onClick={() => {
				window.history.back();
			}}>
				<div className="nav-bar--btn-icon-cont">
					<LeftOutline />
				</div>
				<p className="nav-bar--btn-desc">Back</p>
			</Button>
		</div>
	)
}

export default navBarBottom;
