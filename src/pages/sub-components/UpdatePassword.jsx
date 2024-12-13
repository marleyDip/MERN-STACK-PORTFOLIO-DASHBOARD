import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";

import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updatePassword,
} from "@/store/slices/userSlice";

import SpecialLoadingButton from "./SpecialLoadingButton";
import { toast } from "react-toastify";

const Profile = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { loading, error, message, isUpdated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(clearAllUserErrors());
    }

    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message, isUpdated]);
  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Password</h1>
              <p className="text-balance text-muted-foreground">
                Update Your Dashboard Password
              </p>
            </div>

            <div className="grid gap-6 bg-slate-100">
              <div className="grid gap-2">
                <Label>Current Password</Label>

                <Input
                  type="password"
                  value={currentPassword}
                  placeholder="Enter Current Password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>New Password</Label>

                <Input
                  type="password"
                  value={newPassword}
                  placeholder="Enter New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  value={confirmNewPassword}
                  placeholder="Enter Confirm Password"
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>

              {!loading ? (
                <Button
                  onClick={() => handleUpdatePassword()}
                  className="w-full bg-red-600 hover:bg-teal-600 hover:text-amber-300"
                >
                  Update Password
                </Button>
              ) : (
                <SpecialLoadingButton content={"Updating"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
