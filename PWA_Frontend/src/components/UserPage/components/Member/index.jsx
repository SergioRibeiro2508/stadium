import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Button } from "reactstrap";
import styles from "./styles.module.scss";
import { CameraMedia } from "../../../CameraMedia";
import { usePostData } from "../../../AdminPage/hooks/usePostData";
import { useGetMember } from "../../../../hooks/useGetMember";
import { getMember, createMember } from "../../../../services/api/member";
import { apiOrigin } from "../../../../services/api/config";

export const Member = ({ user, onMemberCreated }) => {
  const photoOrigin = apiOrigin || "http://127.0.0.1:5000";
  const [showForm, setShowForm] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const { isLoading: isLoadingPost, addData } = usePostData(
    (data) => createMember(user._id, data),
    onMemberCreated
  );
  const isMember = user.role ? user.role.scopes.includes("member") : false;
  // só faz sentido pedir os dados de membro se o user já for membro
  const { member } = useGetMember(getMember, isMember ? user._id : null);
  const { register, handleSubmit, reset } = useForm();

  const addMember = (data) => {
    if (!imageSrc) {
      alert("Capture a photo first");
      return;
    }

    const body = {
      ...data,
      base64image: imageSrc,
    };
    addData(body);
  };

  useEffect(() => {
    if (isMember) {
      // reset form with user data
      reset(member);
    }
  }, [member, isMember, reset]);

  if (!showForm && !isMember) {
    return (
      <Button className={styles.button} onClick={() => setShowForm(!showForm)}>
        Be a Member
      </Button>
    );
  }

  if (isLoadingPost) {
    return <div>Is Loading</div>;
  }

  return (
    <Container>
      <Row>
        <Col className={styles.column}>
          <h3>Member Perfil</h3>
          <div className={styles.container}>
            {!isMember && (
              <form className={styles.form} onSubmit={handleSubmit(addMember)}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="taxNumber">
                    Tax Number:
                  </label>
                  <input
                    id="taxNumber"
                    type="number"
                    name="taxNumber"
                    required="required"
                    {...register("taxNumber")}
                  />
                </div>
                <CameraMedia setImage={setImageSrc} imageFile={imageSrc} />
                <Row>
                  <input className="submit" type="submit" />
                </Row>
              </form>
            )}
            {isMember && (
              <>
                <div className={styles.field}>
                  <label className={styles.label}>Tax Number:</label>
                  <span>{member.taxNumber}</span>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Photo:</label>
                  {member.photo && (
                    <img alt="" src={`${photoOrigin}/${member.photo.replace(/^\/+/, "")}`} />
                  )}
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
