import { useNavigate } from 'react-router-dom';
import Topbar, { TopbarItem } from '../../components/Dashboard/Topbar';
import BaseIcon from '../../components/General/BaseIcon';
import Container, { ItemGroup } from '../../components/General/Container';
import { discussionForumViewModel } from '../../viewModels/DiscussionForumViewModel';

function PDDiscussionForum() {
    const posts = discussionForumViewModel.getPosts();
    const users = discussionForumViewModel.getUsers();

    const currentUser = discussionForumViewModel.getUsers().find((user) => user.id === 1);

    return (
        <ItemGroup
            axis={false}
            fitParent={true}
            customClass="pl-10 pr-5 pt-10 overflow-hidden gap-8 item-group-row-odd-left"
            style={{
                minHeight: "78vh",
                maxHeight: "88vh"
            }}
            items={[
                <>
                    <Container
                        fitParent={true}
                        customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
                        headerClass="p-10"
                        header={[
                            <>
                                <ItemGroup
                                    customClass="gap-7"
                                    fitParent={true}
                                    stretch={true}
                                    axis={true}
                                    items={[
                                        <>
                                            <ItemGroup
                                                customClass="justify-content-space-between align-items-center gap-30"
                                                fitParent={true}
                                                stretch={true}
                                                axis={false}
                                                items={[
                                                    <>
                                                        <h1>Community Discussion</h1>
                                                        <ItemGroup
                                                            customClass="gap-3"
                                                            axis={false}
                                                            stretch={true}
                                                            items={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="bg-neutral-1100 br-sm align-items-center justify-items-center px-4 gap-2"
                                                                        isClickable={true}
                                                                        stretch={true}
                                                                        axis={false}
                                                                        items={[
                                                                            <>
                                                                                <BaseIcon
                                                                                    fill="none"
                                                                                    height="28px"
                                                                                    width="28px">
                                                                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                    <g id="SVGRepo_iconCarrier">
                                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z" fill="#000000" />
                                                                                    </g>
                                                                                </BaseIcon>
                                                                                <h1 className="font-4 font-semibold">
                                                                                    Filter
                                                                                </h1>
                                                                            </>
                                                                        ]}
                                                                    />
                                                                    <ItemGroup
                                                                        customClass="bg-dark-100 br-sm align-items-center justify-items-center pl-1 py-1"
                                                                        isClickable={true}
                                                                        stretch={true}
                                                                        axis={false}
                                                                        items={[
                                                                            <>
                                                                                <BaseIcon
                                                                                    fill="none"
                                                                                    height="40px"
                                                                                    width="40px">
                                                                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                    <g id="SVGRepo_iconCarrier">
                                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 12.75V18H12.75V12.75H18V11.25H12.75V6H11.25V11.25H6V12.75H11.25Z" fill="#FFFFFF" />
                                                                                    </g>
                                                                                </BaseIcon>
                                                                                <h1 className="font-4 font-medium text-neutral-1100 pr-4">
                                                                                    Create Post
                                                                                </h1>
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                            />
                                            <ItemGroup
                                                customClass="b-bottom-3 outline-secondary-400"
                                                fitParent={true}
                                                axis={true}
                                            />
                                        </>
                                    ]}
                                />
                            </>
                        ]}
                        contentClass="px-10 scrollable postList"
                        content={[
                            <>
                                <ItemGroup
                                    customClass="gap-5"
                                    fitParent={true}
                                    axis={true}
                                    style={{
                                        maxHeight: "54.5vh"
                                    }}
                                    items={[
                                        <>
                                            {posts.map((post, index) => (
                                                <>
                                                    <Container
                                                        key={index}
                                                        customClass="gradient-white b-5 br px-10 pt-8 pb-4"
                                                        fitParent={true}
                                                        content={[
                                                            <>
                                                                <ItemGroup
                                                                    customClass="gap-6"
                                                                    fitParent={true}
                                                                    axis={true}
                                                                    items={[
                                                                        <>
                                                                            <ItemGroup
                                                                                customClass="align-items-center justify-content-space-between"
                                                                                fitParent={true}
                                                                                stretch={true}
                                                                                axis={false}
                                                                                items={[
                                                                                    <>
                                                                                        <ItemGroup
                                                                                            customClass="align-items-center gap-5"
                                                                                            fitParent={true}
                                                                                            stretch={true}
                                                                                            axis={false}
                                                                                            items={[
                                                                                                <>
                                                                                                    <BaseIcon
                                                                                                        height="40px"
                                                                                                        width="40px"
                                                                                                        fillColor='none'
                                                                                                        viewBox='0 0 61.7998 61.7998'>
                                                                                                        <circle cx="30.8999" cy="30.8999" fill="hsl(210, 50%, 90%)" r="30.8999" />
                                                                                                        <path d="M23.255 38.68l15.907.121v12.918l-15.907-.121V38.68z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                                                        <path d="M43.971 58.905a30.967 30.967 0 0 1-25.843.14V48.417H43.97z" fill="hsl(210, 50%, 90%)" fill-rule="evenodd" />
                                                                                                        <path d="M33.403 61.7q-1.238.099-2.503.1-.955 0-1.895-.057l1.03-8.988h2.41z" fill="hsl(210, 40%, 70%)" fill-rule="evenodd" />
                                                                                                        <path d="M25.657 61.332A34.072 34.072 0 0 1 15.9 57.92a31.033 31.033 0 0 1-7.857-6.225l1.284-3.1 13.925-6.212c0 5.212 1.711 13.482 2.405 18.95z" fill="hsl(210, 40%, 95%)" fill-rule="evenodd" />
                                                                                                        <path d="M39.165 38.759v3.231c-4.732 5.527-13.773 4.745-15.8-3.412z" fill-rule="evenodd" opacity="0.11" />
                                                                                                        <path d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.267 0-21.281-35.266 0-35.266z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                                                        <path d="M18.365 24.046c-3.07 1.339-.46 7.686 1.472 7.658a31.972 31.972 0 0 1-1.472-7.659z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                                                        <path d="M44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.993 31.993 0 0 0 1.471-7.658z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                                                        <path d="M21.931 14.328c-3.334 3.458-2.161 13.03-2.161 13.03l-1.05-.495c-6.554-25.394 31.634-25.395 25.043 0l-1.05.495s1.174-9.572-2.16-13.03c-4.119 3.995-14.526 3.974-18.622 0z" fill="hsl(210, 30%, 70%)" fill-rule="evenodd" />
                                                                                                        <path d="M36.767 61.243a30.863 30.863 0 0 0 17.408-10.018l-1.09-2.631-13.924-6.212c0 5.212-1.7 13.393-2.394 18.861z" fill="hsl(210, 40%, 95%)" fill-rule="evenodd" />
                                                                                                        <path d="M39.162 41.98l-7.926 6.465 6.573 5.913s1.752-9.704 1.353-12.378z" fill="hsl(210, 50%, 90%)" fill-rule="evenodd" />
                                                                                                        <path d="M23.253 41.98l7.989 6.465-6.645 5.913s-1.746-9.704-1.344-12.378z" fill="hsl(210, 50%, 90%)" fill-rule="evenodd" />
                                                                                                        <path d="M28.109 51.227l3.137-2.818 3.137 2.818-3.137 2.817-3.137-2.817z" fill="hsl(210, 40%, 70%)" fill-rule="evenodd" />
                                                                                                        <path d="M25.767 61.373a30.815 30.815 0 0 1-3.779-.88 2.652 2.652 0 0 1-.114-.093l-3.535-6.39 4.541-3.26h-4.752l1.017-6.851 4.11-2.599c.178 7.37 1.759 15.656 2.512 20.073z" fill="hsl(210, 40%, 93%)" fill-rule="evenodd" />
                                                                                                        <path d="M36.645 61.266c.588-.098 1.17-.234 1.747-.384.682-.177 1.36-.377 2.034-.579l.134-.043 3.511-6.315-4.541-3.242h4.752l-1.017-6.817-4.11-2.586c-.178 7.332-1.758 15.571-2.51 19.966z" fill="hsl(210, 40%, 93%)" fill-rule="evenodd" />
                                                                                                    </BaseIcon>
                                                                                                    <h3 className="font-semibold text-neutral-100 font-4">{post.author}</h3>
                                                                                                </>
                                                                                            ]}
                                                                                        />
                                                                                        <p className="font-3 text-neutral-500">{post.timestamp}</p>
                                                                                    </>
                                                                                ]}
                                                                            />
                                                                            <ItemGroup
                                                                                customClass="gap-3"
                                                                                fitParent={true}
                                                                                axis={true}
                                                                                items={[
                                                                                    <>
                                                                                        <ItemGroup
                                                                                            customClass="gap-2 b-bottom-5 outline-neutral-1000"
                                                                                            fitParent={true}
                                                                                            axis={true}
                                                                                            stretch={true}
                                                                                            items={[
                                                                                                <>
                                                                                                    <h3 className="font-semibold font-5">{post.title}</h3>
                                                                                                    <p className="text-neutral-500 pb-4 font-3">{post.content}</p>
                                                                                                </>
                                                                                            ]}
                                                                                        />
                                                                                        <ItemGroup
                                                                                            customClass="gap-2 align-items-center"
                                                                                            axis={false}
                                                                                            stretch={true}
                                                                                            items={[
                                                                                                <>
                                                                                                    <BaseIcon
                                                                                                        height='18px'
                                                                                                        width='18px'
                                                                                                        fillColor='hsl(0, 0%, 60%)'
                                                                                                        viewBox='0 0 48 48'>
                                                                                                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                        <g id="SVGRepo_iconCarrier">
                                                                                                            <title>comment-text</title>
                                                                                                            <g id="Layer_2" data-name="Layer 2">
                                                                                                                <g id="invisible_box" data-name="invisible box">
                                                                                                                    <rect width="48" height="48" fill="none" />
                                                                                                                </g>
                                                                                                                <g id="icons_Q2" data-name="icons Q2">
                                                                                                                    <path d="M40,8V32H13.6l-1.2,1.1L8,37.3V8H40m2-4H6A2,2,0,0,0,4,6V42a2,2,0,0,0,2,2,2,2,0,0,0,1.4-.6L15.2,36H42a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2Z" />
                                                                                                                    <rect x="14" y="14" width="20" height="4" rx="2" ry="2" /> <rect x="14" y="22" width="12" height="4" rx="2" ry="2" />
                                                                                                                </g>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </BaseIcon>
                                                                                                    <p className="text-neutral-600 font-semibold pb-1"><small>{post.replies} replies</small></p>
                                                                                                </>
                                                                                            ]}
                                                                                        />
                                                                                    </>
                                                                                ]}
                                                                            />
                                                                        </>
                                                                    ]}
                                                                />
                                                            </>
                                                        ]}
                                                    />
                                                </>
                                            ))}
                                            <div></div>
                                        </>
                                    ]}
                                />
                            </>
                        ]}
                    />
                    <Container
                        customClass="px-0 pb-10"
                        fitParent={true}
                        content={[
                            <>
                                <Container
                                    fitParent={true}
                                    customClass="gradient-light br-md b-3 outline-neutral-1100 justify-content-center align-items-center"
                                    content={[
                                        <>
                                            <ItemGroup
                                                customClass="gap-10"
                                                axis={true}
                                                fitParent={true}
                                                items={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="justify-items-center gap-5"
                                                            axis={true}
                                                            fitParent={true}
                                                            items={[
                                                                <>
                                                                    <BaseIcon
                                                                        height="150px"
                                                                        width="150px"
                                                                        fillColor='none'
                                                                        viewBox='0 0 61.7998 61.7998'>
                                                                        <circle cx="30.8999" cy="30.8999" fill="hsl(210, 50%, 90%)" r="30.8999" />
                                                                        <path d="M23.255 38.68l15.907.121v12.918l-15.907-.121V38.68z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                        <path d="M43.971 58.905a30.967 30.967 0 0 1-25.843.14V48.417H43.97z" fill="hsl(210, 50%, 90%)" fill-rule="evenodd" />
                                                                        <path d="M33.403 61.7q-1.238.099-2.503.1-.955 0-1.895-.057l1.03-8.988h2.41z" fill="hsl(210, 40%, 70%)" fill-rule="evenodd" />
                                                                        <path d="M25.657 61.332A34.072 34.072 0 0 1 15.9 57.92a31.033 31.033 0 0 1-7.857-6.225l1.284-3.1 13.925-6.212c0 5.212 1.711 13.482 2.405 18.95z" fill="hsl(210, 40%, 95%)" fill-rule="evenodd" />
                                                                        <path d="M39.165 38.759v3.231c-4.732 5.527-13.773 4.745-15.8-3.412z" fill-rule="evenodd" opacity="0.11" />
                                                                        <path d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.267 0-21.281-35.266 0-35.266z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                        <path d="M18.365 24.046c-3.07 1.339-.46 7.686 1.472 7.658a31.972 31.972 0 0 1-1.472-7.659z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                        <path d="M44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.993 31.993 0 0 0 1.471-7.658z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                        <path d="M21.931 14.328c-3.334 3.458-2.161 13.03-2.161 13.03l-1.05-.495c-6.554-25.394 31.634-25.395 25.043 0l-1.05.495s1.174-9.572-2.16-13.03c-4.119 3.995-14.526 3.974-18.622 0z" fill="hsl(210, 30%, 70%)" fill-rule="evenodd" />
                                                                        <path d="M36.767 61.243a30.863 30.863 0 0 0 17.408-10.018l-1.09-2.631-13.924-6.212c0 5.212-1.7 13.393-2.394 18.861z" fill="hsl(210, 40%, 95%)" fill-rule="evenodd" />
                                                                        <path d="M39.162 41.98l-7.926 6.465 6.573 5.913s1.752-9.704 1.353-12.378z" fill="hsl(210, 50%, 90%)" fill-rule="evenodd" />
                                                                        <path d="M23.253 41.98l7.989 6.465-6.645 5.913s-1.746-9.704-1.344-12.378z" fill="hsl(210, 50%, 90%)" fill-rule="evenodd" />
                                                                        <path d="M28.109 51.227l3.137-2.818 3.137 2.818-3.137 2.817-3.137-2.817z" fill="hsl(210, 40%, 70%)" fill-rule="evenodd" />
                                                                        <path d="M25.767 61.373a30.815 30.815 0 0 1-3.779-.88 2.652 2.652 0 0 1-.114-.093l-3.535-6.39 4.541-3.26h-4.752l1.017-6.851 4.11-2.599c.178 7.37 1.759 15.656 2.512 20.073z" fill="hsl(210, 40%, 93%)" fill-rule="evenodd" />
                                                                        <path d="M36.645 61.266c.588-.098 1.17-.234 1.747-.384.682-.177 1.36-.377 2.034-.579l.134-.043 3.511-6.315-4.541-3.242h4.752l-1.017-6.817-4.11-2.586c-.178 7.332-1.758 15.571-2.51 19.966z" fill="hsl(210, 40%, 93%)" fill-rule="evenodd" />
                                                                    </BaseIcon>
                                                                    <ItemGroup
                                                                        customClass="justify-items-center gap-4"
                                                                        axis={true}
                                                                        items={[
                                                                            <>
                                                                                <ItemGroup
                                                                                    customClass="justify-items-center gap-2"
                                                                                    axis={true}
                                                                                    items={[
                                                                                        <>
                                                                                            <h3 className="font-semibold font-7">{currentUser.firstName} {currentUser.lastName}</h3>
                                                                                            <h3 className="font-regular font-4 text-neutral-700">{currentUser.email}</h3>
                                                                                        </>
                                                                                    ]}
                                                                                />
                                                                                <Container
                                                                                    customClass="bg-dark-100 br px-4 py-2"
                                                                                    isClickable={true}
                                                                                    content={[
                                                                                        <>
                                                                                            <h3 className="font-semibold font-4 text-neutral-1100">Edit Profile</h3>
                                                                                        </>
                                                                                    ]}
                                                                                />
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                        <ItemGroup
                                                            axis={true}
                                                            fitParent={true}
                                                            customClass="bg-neutral-1100 br p-7 gap-5"
                                                            items={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="gap-2"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        style={{
                                                                            maxWidth: "250px"
                                                                        }}
                                                                        items={[
                                                                            <>
                                                                                <h3 className="text-neutral-700 font-semibold font-4">BIO</h3>
                                                                                <p className="font-3">{currentUser.bio}</p>
                                                                            </>
                                                                        ]}
                                                                    />
                                                                    <ItemGroup
                                                                        customClass="gap-4"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        style={{
                                                                            maxWidth: "250px"
                                                                        }}
                                                                        items={[
                                                                            <>
                                                                                <h3 className="text-neutral-700 font-semibold font-4">TAGS</h3>
                                                                                <ItemGroup
                                                                                    customClass="gap-3"
                                                                                    axis={true}
                                                                                    items={[
                                                                                        <>
                                                                                            <Container
                                                                                                customClass="bg-success-500 br py-2 px-4"
                                                                                                content={[
                                                                                                    <>
                                                                                                        <h3 className="text-success-100 font-semibold font-4">Patient</h3>
                                                                                                    </>
                                                                                                ]}
                                                                                            />
                                                                                            <Container
                                                                                                customClass="bg-user-500 br py-2 px-4"
                                                                                                content={[
                                                                                                    <>
                                                                                                        <h3 className="text-user-300 font-semibold font-4">{currentUser.firstName} {currentUser.lastName}</h3>
                                                                                                    </>
                                                                                                ]}
                                                                                            />
                                                                                        </>
                                                                                    ]}
                                                                                />
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                            />
                                        </>
                                    ]}
                                />
                            </>
                        ]}
                    />
                </>
            ]}
        />
    );
}

export default PDDiscussionForum;