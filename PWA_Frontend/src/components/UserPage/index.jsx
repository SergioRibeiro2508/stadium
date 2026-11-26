import { useEffect, useRef, useState } from "react";
import {
  Row,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { Tickets } from "./components/Tickets";
import { Perfil } from "./components/Perfil";
import { Member } from "./components/Member";
import styles from "./styles.module.scss";
import { useGetPerfil } from "../../hooks/useGetPerfil";
import { getPerfil } from "../../services/api/perfil";
import {
  socketAddListener,
  socketRemoveListener,
  initSocket,
} from "../../socket/socket";
import { toast } from "react-toastify";

const UserPage = () => {
  const [activePage, setActivePage] = useState("1");
  const { isError, isLoading, user, load } = useGetPerfil(getPerfil);

  const listenerConfiguredRef = useRef(false);

  const newNotification = (data) => {
    const options = {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    };

    if (data.key === "Game") {
      toast.warn(data.message, options);
    } else {
      toast.info(data.message, options);
    }
  };

  useEffect(() => {
    initSocket();

    // o handler tem de ser o mesmo no add e no remove, senão o socket.off
    // não remove nada e o listener fica duplicado
    const handleNotification = (data) => {
      newNotification(data);
    };

    if (!listenerConfiguredRef.current) {
      console.log("Configurando ouvinte pela primeira vez");
      socketAddListener("admin_notifications", handleNotification);
      listenerConfiguredRef.current = true;
    } else {
      console.log("Ouvinte já configurado. Ignorando....");
    }

    return () => {
      socketRemoveListener("admin_notifications", handleNotification);
      listenerConfiguredRef.current = false;
    };
  }, []);

  const navItems = [
    {
      id: "1",
      title: "Perfil",
    },
    {
      id: "2",
      title: "Tickets",
    },
    {
      id: "3",
      title: "Member",
    },
  ];

  const items = [
    {
      id: "1",
      children: <Perfil user={user.data} />,
    },
    {
      id: "2",
      children: <Tickets />,
    },
    {
      id: "3",
      children: <Member user={user.data} onMemberCreated={load} />,
    },
  ];

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  if (isError) {
    return <div>UPPSSSS</div>;
  }

  return (
    <Container className={styles.container}>
      <h1>User {user.data.name}</h1>
      <Row className={styles.row}>
        <Nav tabs>
          {navItems.map((item) => {
            return (
              <NavItem key={item.id}>
                <NavLink
                  className={item.id === activePage ? "active" : ""}
                  onClick={() => setActivePage(item.id)}
                >
                  {item.title}
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

export default UserPage;
