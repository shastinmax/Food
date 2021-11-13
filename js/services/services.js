const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "Post",
        headers: {"Content-type": "application/json"},
        body: data,
    });
    return await res.json();
};
export {postData};