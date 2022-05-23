import { ChapterStatus } from "graphql/generated/graphqlTypes";
import {
  useDeleteChapterMutation,
  useUpdateStatusMutation,
} from "graphql/generated/mutations";
import router from "next/router";
import { toast } from "react-toastify";

export const Api = () => {
  const updateStatus = () => {
    const [updateTale] = useUpdateStatusMutation();

    async function run(to: ChapterStatus, chapterId: string) {
      const sure = confirm(`Send tale to ${to.toString()}?`);
      if (sure) {
        try {
          await updateTale({
            variables: {
              id: chapterId,
              newStatus: to,
            },
            update(cache, { data: updatedTale }) {
              cache.modify({
                id: chapterId,
                fields: {
                  status() {
                    return updatedTale?.changeStatus.status;
                  },
                },
              });
            },
          });
        } catch (err: any) {
          toast(err.message, {
            toastId: "status-error",
          });
        }
      }
    }
    return { run };
  };

  const deleteChapter = () => {
    const [deleteChapter] = useDeleteChapterMutation();

    async function run(id: string) {
      const sure = confirm(
        "Are you sure you want to delete this story? This is irreversible."
      );
      if (sure) {
        try {
          await deleteChapter({ variables: { chapterId: id } });
          router.push("/dashboard");
          toast("Story deleted.", {
            toastId: id,
          });
        } catch (err) {
          toast((err as any).message, {
            toastId: id,
          });
        }
      }
    }

    return { run };
  };

  return {
    updateStatus,
    deleteChapter,
  };
};

// export default withApollo(Api);
