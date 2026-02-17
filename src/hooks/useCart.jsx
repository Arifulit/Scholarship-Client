// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";



const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        enabled: !!user?.email,
        queryFn: async() => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`);
            return res.data;
        },
        retry: 1,
        staleTime: 2 * 60 * 1000
    })

    return [cart, refetch]
};

export default useCart;