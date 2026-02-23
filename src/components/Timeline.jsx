import React, { useEffect, useRef } from 'react';
import { Timeline as VisTimeline } from 'vis-timeline/standalone';
import { DataSet } from 'vis-data';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import { v4 as uuidv4 } from 'uuid';
import projectData from '../data/town_projects.json';

const Timeline = () => {
    const containerRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Transform data
        const groups = new DataSet();
        const items = new DataSet();

        Object.keys(projectData).forEach((key) => {
            const project = projectData[key];

            // Add group
            groups.add({
                id: key,
                content: project.title,
                style: `border-left: 4px solid ${project.color}; padding-left: 10px; font-weight: bold;`
            });

            // Add phases
            if (project.phases) {
                project.phases.forEach((phase) => {
                    items.add({
                        id: uuidv4(),
                        group: key,
                        content: phase.name,
                        start: phase.start,
                        end: phase.end,
                        type: 'range',
                        title: phase.description, // Tooltip
                        style: `background-color: ${project.color}33; border-color: ${project.color}; color: #333;` // 33 for transparency
                    });
                });
            }

            // Add events
            if (project.events) {
                project.events.forEach((event) => {
                    items.add({
                        id: uuidv4(),
                        group: key,
                        content: event.name,
                        start: event.date,
                        type: 'point',
                        title: event.description, // Tooltip
                        style: `border-color: ${project.color}; background-color: ${project.color}; color: white;`
                    });
                });
            }
        });

        // Configuration options
        const options = {
            groupOrder: 'content', // order by content
            editable: false, // read-only
            margin: {
                item: 10, // minimal margin between items
                axis: 5   // minimal margin between items and the axis
            },
            orientation: 'top',
            stack: true,
            zoomMin: 1000 * 60 * 60 * 24 * 7, // one week
            zoomMax: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
            tooltip: {
                followMouse: true,
                overflowMethod: 'cap'
            },
            height: '500px', // Fixed height
            start: '2025-01-01', // Default start view
            end: '2026-12-31'   // Default end view
        };

        // Create a Timeline
        // Note: VisTimeline constructor expects native DOM element
        if (containerRef.current) {
             timelineRef.current = new VisTimeline(containerRef.current, items, groups, options);
        }

        // Cleanup
        return () => {
            if (timelineRef.current) {
                timelineRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="w-full">
            <div ref={containerRef} className="border border-gray-200 rounded-lg shadow-sm bg-white" />
            <div className="mt-4 text-sm text-gray-600 flex justify-between">
                <p>Scroll to zoom, drag to pan. Hover over items for details.</p>
                <div className="flex gap-4">
                    {Object.values(projectData).map(p => (
                         <div key={p.title} className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }}></span>
                            <span>{p.title}</span>
                         </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;
