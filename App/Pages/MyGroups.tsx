import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import { firebaseGroupCollection } from "../../App";
import Back from "../Components/Atoms/Back";
import MyButton from "../Components/Atoms/MyButton";
import CreateNewGroup from "../Components/Home Screen/Groups/CreateNewGroup";
import colors from "../config/colors";
import { useUserContext } from "../UserContext";
import { group, userInfo } from "./AllGroups";

const MyGroups = () => {
  const [groups, setGroups] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const { currentUser } = useUserContext();
  const navigation = useNavigation<any>();

  const getGroups = async () => {
    const res = await firebaseGroupCollection.get();
    const tempGroups = res.docs
      .map((doc) => doc.data())
      .filter((group) => {
        return group.users
          ?.map((user: userInfo) => {
            return user.uid;
          })
          .includes(currentUser.uid);
      });
    if (tempGroups[0] === undefined) {
      return;
    }
    setGroups(tempGroups);
  };
  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    getGroups();
  }, [refresh]);

  return (
    <SafeAreaView style={styles.background}>
      <Back />
      <ScrollView style={styles.buttonsContainer}>
        <CreateNewGroup refresh={refresh} setRefresh={setRefresh} />
        {groups &&
          groups.map((group: group) => {
            return (
              <MyButton
                containerColor={colors.second}
                textColor={colors.first}
                text={group.name}
                onPress={() =>
                  navigation.navigate("Group", {
                    group: group,
                  })
                }
                key={group.id}
              />
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyGroups;

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.first,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    paddingTop: 75,
    width: "100%",
  },
});
