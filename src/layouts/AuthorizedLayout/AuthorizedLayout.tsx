import { ReactNode } from "react";
import Header from "../../components/Header/Header";
import "./AuthorizedLayout.css";

export default function AuthorizedLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div>
            <Header />
            <main className="main-content-authorized">{children}</main>
        </div>
    );
}
