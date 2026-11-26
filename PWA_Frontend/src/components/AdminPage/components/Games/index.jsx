import { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Table from "../../../Table";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useGetData } from "../../hooks/useGetData";
import { usePostData } from "../../hooks/usePostData";
import { getGames, createGame } from "../../../../services/api/games";
import { TabContext } from "../../contexts";

const Games = () => {
  const { register, handleSubmit } = useForm();
  const { isError, isLoading, data, load } = useGetData(getGames, 0, 0);
  const { isLoading: isLoadingPost, addData } = usePostData(createGame, load);
  const { setGamesCount } = useContext(TabContext);

  useEffect(() => {
    setGamesCount(data.data.length);
  }, [data, setGamesCount]);

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
          <h3>Create Game</h3>
          {isLoadingPost ? (
            <div>Is Loading</div>
          ) : (
            <div className={styles.container}>
              <form className={styles.form} onSubmit={handleSubmit(addData)}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="game-name">Name:</label>
                  <input id="game-name" required {...register("name")} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="game-date">Date:</label>
                  <input id="game-date" type="date" required {...register("date")} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="game-home">Home:</label>
                  <input id="game-home" required {...register("team.home")} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="game-visitor">Visitor:</label>
                  <input id="game-visitor" required {...register("team.visitor")} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="game-image">Image (URL):</label>
                  <input id="game-image" required {...register("image")} />
                </div>
                <Row>
                  <input className="submit" type="submit" />
                </Row>
              </form>
            </div>
          )}
        </Col>
        <Col>
          <Table
            columns={["date", "name", "image", "team.visitor", "team.home"]}
            rows={data}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Games;