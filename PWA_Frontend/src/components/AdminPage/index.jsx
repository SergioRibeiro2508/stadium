import { useContext, useState } from "react";
import styles from "./styles.module.scss";
import {
  Row,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import Stadium from "./components/Stadium";
import Users from "./components/Users";
import Tickets from "./components/Tickets";
import Games from "./components/Games";
import { TabContext } from "./contexts";

const AdminPage = () => {
  const [activePage, setActivePage] = useState("1");
  const { countGames } = useContext(TabContext);

  const navItems = [
    {
      id: "1",
      title: "Users",
    },
    {
      id: "2",
      title: "Stadium",
    },
    {
      id: "3",
      title: "Tickets",
    },
    { 
      id: "4",
      title: "Games",
      count: countGames,
    },
  ];

  const items = [
    {
      id: "1",
      children: <Users />,
    },
    {
      id: "2",
      children: <Stadium />,
    },
    {
      id: "3",
      children: <Tickets />,
    },
    { 
      id: "4", 
      children: <Games />,
    },
  ];

  return (
    <Container className={styles.container}>
      <h1>Admin</h1>
      <Row className={styles.row}>
        <Nav tabs>
          {navItems.map((item) => {
            return (
              <NavItem key={item.id}>
                <NavLink
                  className={item.id === activePage ? "active" : ""}
                  onClick={() => setActivePage(item.id)}
                >
                  {item.title}{" "}
                  {item.count > 0 && (
                    <span className={styles.count}>{item.count}</span>
                  )}
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
        <TabContent activeTab={activePage}>
          {items.map((item) => {
            return (
              <TabPane key={item.id} tabId={item.id}>
                {item.children}
              </TabPane>
            );
          })}
        </TabContent>
      </Row>
    </Container>
  );
};

export default AdminPage;
