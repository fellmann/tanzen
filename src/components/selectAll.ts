export default (e: React.FocusEvent<HTMLInputElement>) =>
  setTimeout(() => e.target.setSelectionRange(0, 10), 1);
