import { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Table from "../../../Table";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useGetData } from "../../hooks/useGetData";
import { usePostData } from "../../hooks/usePostData";
import { getUsers, createUser } from "../../../../services/api/users";
import { UsersContext } from "../../../../contexts/UsersProvider";
import { TabContext } from "../../contexts";

const Users = () => {
  const { register, handleSubmit } = useForm();
  const { isError, isLoading, data, load } = useGetData(getUsers, 0, 0);
  const { isLoading: isLoadingPost, addData } = usePostData(createUser, load);
  const { setUsers } = useContext(UsersContext);
  const { setClicksCount, countClicks } = useContext(TabContext);

  useEffect(() => {
    setUsers(data.data);
  }, [data, setUsers]);

  const handleClick = () => {
    setClicksCount(countClicks + 1);
  };

  const addUser = (formData) =>
    addData({
      ...formData,
      role: { name: "user", scopes: "notMember" },
    });

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  if (isError) {
    return <div>UPPSSSS</div>;
  }

  return (
    <Container>
      <Row>
        <Col className={styles.column}>
          <h3>Create User</h3>
          {isLoadingPost ? (
            <div>Is Loading</div>
          ) : (
            <div className={styles.container}>
              <form className={styles.form} onSubmit={handleSubmit(addUser)}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="name">Name:</label>
                  <input id="name" name="name" required="required" {...register("name")} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="password">Password:</label>
                  <input id="password" name="password" type="password" required="required" {...register("password")} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">Email:</label>
                  <input id="email" name="email" type="email" required="required" {...register("email")} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="age">Age :</label>
                  <input id="age" name="age" type="number" {...register("age")} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="address">Address :</label>
                  <input id="address" name="address" required="required" {...register("address")} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="country">Country :</label>
                  <input id="country" name="country" required="required" {...register("country")} />
                </div>
                <Row>
                  <input className="submit" type="submit" />
                </Row>
              </form>
            </div>
          )}
        </Col>
        <Col>
          <Table columns={["name", "email", "age", "country"]} rows={data} />
        </Col>
      </Row>
      <Row>
        <Col>
          <button onClick={handleClick}>N.º Clicks: {countClicks}</button>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;