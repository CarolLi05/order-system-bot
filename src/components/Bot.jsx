export default function Bot({ id, status }) {

  let BotClasses =
    "inline-flex flex-wrap algin-items-center justify-content-center px-2 py-1 mr-1 mb-1 rounded-full text-sm text-white bg-gray-400";

  return (
    <>
      <li className={BotClasses}>
        Bot #{id} {status}
      </li>
    </>
  );
}
