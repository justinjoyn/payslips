import React, { useEffect, useState } from 'react';

import { SafeArea, SafeAreaInsets } from 'capacitor-plugin-safe-area';

type Props = {
    children: React.ReactNode;
};

export default function SafeAreaView(props: Props) {
    const [safeArea, setSafeArea] = useState<SafeAreaInsets>();
    const [statusBarHeight, setStatusBarHeight] = useState(0);

    useEffect(() => {
        // Get status bar height
        SafeArea.getStatusBarHeight().then(data => {
            setStatusBarHeight(data.statusBarHeight);
        });

        // Get safe area insets
        SafeArea.getSafeAreaInsets().then(data => {
            setSafeArea(data);
        });

        // Listen for safe area changes
        SafeArea.addListener('safeAreaChanged', data => {
            setSafeArea(data);
        });

        return () => {
            // Remove listeners
            SafeArea.removeAllListeners();
        };
    }, []);

    return (
        // <div style={{ overflow: 'hidden', display: 'flex' }}>
        // <div style={{ height: statusBarHeight, backgroundColor: 'red' }} />
        <div
            style={{
                // marginTop: safeArea?.insets.top,
                paddingRight: safeArea?.insets.right,
                paddingBottom: safeArea?.insets.bottom,
                paddingLeft: safeArea?.insets.left,
                overflow: 'auto',
                flex: 1
            }}>
            {props.children}
        </div>
        // </div>
    );
}
