import { Modal } from "antd";

const DeclineModal = ({
  modal2Open,
  textAreaValue,
  handleTextAreaChange,
  setModal2Open,
  handleSubmitt,
}) => {
  return (
    <Modal centered open={modal2Open} onCancel={() => setModal2Open(false)}>
      <div>
        <h2 className="text-center text-xl font-semibold mt-2">
          Why you Want to Decline ?
        </h2>

        <textarea
          placeholder="Write your feadback"
          defaultValue={textAreaValue}
          className="border mt-8 border-dotted border-[#5B5A5A] p-3 w-full rounded-md"
          onBlur={handleTextAreaChange}
          cols="10"
          rows="3"
        ></textarea>
        <div className="flex items-center justify-end mt-4">
          <button
            onClick={handleSubmitt}
            className="font-bold uppercase text-xs py-1 md:py-2 rounded-full px-3 md:px-6 bg-[#FF2400] transition-all shadow-md duration-300 border-y border-[#FF664D] hover:bg-[#ff5537] text-white"
          >
            Send
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeclineModal;
