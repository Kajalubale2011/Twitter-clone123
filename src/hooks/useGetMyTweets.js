import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";

const useGetMyTweets = (id) => {
    const dispatch = useDispatch();
    const { refresh, isActive } = useSelector(store => store.tweet);

    // useEffect hook that handles data fetching
    useEffect(() => {
        // Function to fetch user's tweets
        const fetchMyTweets = async () => {
            try {
                const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, {
                    withCredentials: true
                });
                console.log(res);
                dispatch(getAllTweets(res.data.tweets));
            } catch (error) {
                console.log(error);
            }
        };

        // Function to fetch following tweets
        const followingTweetHandler = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`);
                console.log(res);
                dispatch(getAllTweets(res.data.tweets));
            } catch (error) {
                console.log(error);
            }
        };

        // Run the appropriate function based on isActive state
        if (isActive) {
            fetchMyTweets();
        } else {
            followingTweetHandler();
        }
    }, [id, dispatch, isActive, refresh]); // Add all dependencies needed for useEffect

};

export default useGetMyTweets;
